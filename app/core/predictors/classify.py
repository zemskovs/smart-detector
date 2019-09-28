import numpy as np

from app.core.predictors.classifiers.models import load_classifiers, predict_class
from app.core.predictors.lda.dataset_import import tokenize_lemmatize_filter_stops
from app.core.predictors.lda.infer_lda import extract_feature_vector, load_lda_corpora, new_text, \
    load_categories_mapping
from constants.constants import CATEGORIES_PATH

MODELS = load_classifiers()
LDA, DICTIONARY = load_lda_corpora()
CATEGORIES_MAPPING = load_categories_mapping(CATEGORIES_PATH)


def classify_text(text):
    prepared_text = tokenize_lemmatize_filter_stops(text)
    features = extract_feature_vector(text=prepared_text,
                                      lda_model=LDA,
                                      corpora_dict=DICTIONARY)
    reshaped = np.array(features).reshape(1, len(features))
    classes = np.array([predict_class(lambda: model.predict(reshaped)) for model in MODELS])
    flattened = classes.flatten()
    y = np.bincount(np.array(flattened, dtype=np.int64))
    ii = np.nonzero(y)[0]
    return list(sorted(zip(ii, y[ii]), key=lambda x: x[1], reverse=True))[0][0]


if __name__ == '__main__':
    c = classify_text(new_text)
    print(CATEGORIES_MAPPING[str(c)])
