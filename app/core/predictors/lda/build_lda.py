import os

from app.core.predictors.lda.dataset_import import import_data
from gensim import corpora, models

from constants.constants import ARTIFACTS_DIR, SAMPLE_DATASET_PATH, LDA_LATENT_TOPICS


def build_lda(data, artifacts_path='./result/', num_topics=50):
    dictionary = corpora.Dictionary(data)

    dict_dir = os.path.join(artifacts_path, 'dict')
    os.makedirs(dict_dir, exist_ok=True)
    dictionary.save(os.path.join(dict_dir, 'sample.dict'))

    corpus = [dictionary.doc2bow(text) for text in data]

    corpus_dir = os.path.join(artifacts_path, 'corpus')
    os.makedirs(corpus_dir, exist_ok=True)
    corpora.MmCorpus.serialize(os.path.join(corpus_dir, 'sample.mm'), corpus)

    tf_idf = models.TfidfModel(corpus)
    corpus_tfidf = tf_idf[corpus]
    lda = models.LdaModel(corpus_tfidf,
                          id2word=dictionary,
                          num_topics=num_topics,
                          minimum_probability=0.00)

    lda_dir = os.path.join(artifacts_path, 'lda')
    os.makedirs(lda_dir, exist_ok=True)
    lda.save(os.path.join(lda_dir, 'sample_model.lda'))


if __name__ == '__main__':
    raw_data = import_data(path=SAMPLE_DATASET_PATH)
    build_lda(raw_data, artifacts_path=ARTIFACTS_DIR, num_topics=LDA_LATENT_TOPICS)
