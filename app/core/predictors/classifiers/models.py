import shelve
import os

import numpy as np
from keras import Sequential
from keras.engine.saving import load_model
from keras.layers import Dense
from sklearn.linear_model import LogisticRegression
from sklearn import metrics
from sklearn.multiclass import OneVsRestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC

from joblib import dump, load

from constants.constants import LATENT_TOPICS_DATASET, ARTIFACTS_DIR, CLASSIFIERS_DIR, LOGISTIC_REGRESSION_MODEL_PATH, \
    BAYES_MODEL_PATH, NN_MODEL_PATH, SVM_MODEL_PATH


def load_dataset(dataset_path):
    d = shelve.open(dataset_path + '.db')
    arr = np.array(d['dataset'])
    d.close()
    return arr


def split_dataset_for_supervised_learning(dataset, train_ratio=0.8):
    by_categories = {}
    for index, line in enumerate(dataset):
        try:
            by_categories[line[-1]].append(index)
        except KeyError:
            by_categories[line[-1]] = [index, ]

    overall_rows = len(dataset)
    print('Dataset has {rows} rows'.format(rows=overall_rows))
    for key, value in by_categories.items():
        print('Category {category} has {quantity}. {ratio}'.format(category=key,
                                                                   quantity=len(value),
                                                                   ratio=len(value) / overall_rows))
    train_x = []
    train_y = []
    test_x = []
    test_y = []

    for category_id, indexes in by_categories.items():
        train_index = int(len(indexes) * train_ratio)
        train_x.extend([d[:-1] for i, d in enumerate(dataset) if i in indexes[:train_index]])
        train_y.extend([d[-1] for i, d in enumerate(dataset) if i in indexes[:train_index]])
        test_x.extend([d[:-1] for i, d in enumerate(dataset) if i in indexes[train_index:]])
        test_y.extend([d[-1] for i, d in enumerate(dataset) if i in indexes[train_index:]])

    train_dataset = (np.array(train_x), np.array(train_y))
    test_dataset = (np.array(test_x), np.array(test_y))
    return train_dataset, test_dataset


def train_regressor(x, y):
    model = LogisticRegression(random_state=0, solver='lbfgs', multi_class='multinomial')
    return model.fit(x, y)


def train_bayes_regressor(x, y):
    model = GaussianNB()
    return model.fit(x, y)


def train_svm_regressor(x, y):
    model = OneVsRestClassifier(SVC(kernel='linear', C=1, decision_function_shape='ovr'))
    return model.fit(x, y)


def train_neural_regressor(x_values, y):
    num_categories = len(set(list(y)))
    model = Sequential()
    model.add(Dense(100, batch_input_shape=(None, 50), activation='relu'))
    model.add(Dense(num_categories, activation='softmax'))
    # Compile model
    model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
    model.summary()
    y_hot_encodings = []
    for i in y:
        vec = [0 for _ in range(num_categories)]
        vec[int(i)] = 1
        y_hot_encodings.append(vec)
    model.fit(np.array(x_values, dtype=np.float32), np.array(y_hot_encodings, dtype=np.float32),
              epochs=50)
    return model


def predict_class(sm_model_cb):
    y_predicted = sm_model_cb()
    if len(y_predicted[0].shape) > 0:
        y_predicted = np.argmax(y_predicted, axis=1)
    return y_predicted


def validate_accuracy(sm_model_cb, y_expected):
    y_predicted = predict_class(sm_model_cb)
    accuracy = [i == j for i, j in zip(y_predicted, y_expected)].count(True) / len(y_expected)
    mae = metrics.mean_absolute_error(y_expected, y_predicted)
    mse = metrics.mean_squared_error(y_expected, y_predicted)
    rmse = np.sqrt(metrics.mean_squared_error(y_expected, y_predicted))
    return accuracy, mae, mse, rmse


def train_validate(train_x, train_y, test_x, test_y, train_cb, model_name='scikit'):
    model = train_cb(train_x, train_y)
    accuracy, mae, mse, rmse = validate_accuracy(lambda: model.predict(test_x), test_y)
    print('{} model. Accuracy: {accuracy}. MAE: {mae}. MSE: {mse}. RMSE: {rmse}'.format(model_name,
                                                                                        accuracy=accuracy,
                                                                                        mae=mae,
                                                                                        mse=mse,
                                                                                        rmse=rmse))
    return model


def train_classifiers(train_x, train_y, test_x, test_y):
    if os.path.exists(CLASSIFIERS_DIR):
        return

    os.makedirs(CLASSIFIERS_DIR, exist_ok=True)

    log_regr = train_validate(train_x, train_y, test_x, test_y, train_regressor, model_name='Logistic regression')
    dump(log_regr, LOGISTIC_REGRESSION_MODEL_PATH)

    bayes = train_validate(train_x, train_y, test_x, test_y, train_bayes_regressor, model_name='Naive Bayes')
    dump(bayes, BAYES_MODEL_PATH)

    svm_model = train_validate(train_x, train_y, test_x, test_y, train_svm_regressor, model_name='SVM')
    dump(svm_model, SVM_MODEL_PATH)

    nn_model = train_validate(train_x, train_y, test_x, test_y, train_neural_regressor, model_name='Keras')
    nn_model.save(NN_MODEL_PATH)


def load_classifiers():
    log_regr = load(LOGISTIC_REGRESSION_MODEL_PATH)

    bayes = load(BAYES_MODEL_PATH)

    svm_model = load(SVM_MODEL_PATH)

    nn_model = load_model(NN_MODEL_PATH)
    nn_model._make_predict_function()

    return log_regr, bayes, svm_model, nn_model


if __name__ == '__main__':
    dataset = load_dataset(LATENT_TOPICS_DATASET)
    train_dataset, test_dataset = split_dataset_for_supervised_learning(dataset)
    train_x, train_y = train_dataset
    test_x, test_y = test_dataset

    train_classifiers(train_x, train_y, test_x, test_y)
