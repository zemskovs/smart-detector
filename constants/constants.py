import os

LDA_LATENT_TOPICS = 50

PROJECT_ROOT = os.path.join(os.path.dirname(os.path.realpath(__file__)), os.pardir)
ARTIFACTS_DIR = os.path.join(PROJECT_ROOT, 'result')
SAMPLE_DATASET_PATH = os.path.join(PROJECT_ROOT, 'data', 'sample_dataset.xlsx')
CORPORA_DICTIONARY = os.path.join(ARTIFACTS_DIR, 'dict', 'sample.dict')
LDA_MODEL_PATH = os.path.join(ARTIFACTS_DIR, 'lda', 'sample_model.lda')
LATENT_TOPICS_DATASET = os.path.join(ARTIFACTS_DIR, 'topics', 'topics_dataset')
CATEGORIES_PATH = os.path.join(ARTIFACTS_DIR, 'categories', 'categories.json')
ORIGINAL_CATEGORIAL_DATASET = os.path.join(ARTIFACTS_DIR, 'prebuilt_original_dataset', 'prebuild_original_dataset')

CLASSIFIERS_DIR = os.path.join(ARTIFACTS_DIR, 'classifiers')
LOGISTIC_REGRESSION_MODEL_PATH = os.path.join(CLASSIFIERS_DIR, 'log_regression.joblib')
BAYES_MODEL_PATH = os.path.join(CLASSIFIERS_DIR, 'bayes.joblib')
SVM_MODEL_PATH = os.path.join(CLASSIFIERS_DIR, 'svm.joblib')
NN_MODEL_PATH = os.path.join(CLASSIFIERS_DIR, 'nn.h5')
