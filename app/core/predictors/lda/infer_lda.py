import json
import os
import shelve

import numpy as np
from gensim import corpora, models

from app.core.predictors.lda.dataset_import import tokenize_lemmatize_filter_stops, import_data_by_categories
from constants.constants import CORPORA_DICTIONARY, LDA_MODEL_PATH, LATENT_TOPICS_DATASET, CATEGORIES_PATH, \
    LDA_LATENT_TOPICS, ORIGINAL_CATEGORIAL_DATASET


def probs_for_text(text, lda_model, corpora_dict):
    doc_bow = corpora_dict.doc2bow(text)
    doc_lda = lda_model[doc_bow]
    distribution = {}
    for topicNum, probability in doc_lda:
        distribution[topicNum] = probability
    return distribution


def save_categories_mapping(dataset, categories_path):
    all_categories = list(dataset.keys())
    ids = list(range(len(all_categories)))
    mapping = {i: j for i, j in zip(ids, all_categories)}
    os.makedirs(os.path.split(categories_path)[0], exist_ok=True)
    with open(categories_path, 'w') as f:
        f.write(json.dumps(mapping))


def save_prebuilt_dataset(dataset, dataset_path):
    os.makedirs(os.path.split(dataset_path)[0], exist_ok=True)
    d = shelve.open(dataset_path)
    d['dataset'] = dataset
    d.close()


def load_prebuilt_dataset(dataset_path):
    d = shelve.open(dataset_path)
    res = d['dataset']
    d.close()
    return res


def load_categories_mapping(categories_path):
    with open(categories_path, 'r') as f:
        return json.loads(f.read())


def find_category_id_by(name, categories_mapping):
    filtered = filter(lambda category_id: categories_mapping[category_id] == name, categories_mapping.keys())
    return int(list(filtered)[0])


def collect_latent_topics_dataset(original_dataset, lda_model, corpora_dict, categories_mapping):
    res_dataset = []
    for category_name, texts in original_dataset.items():
        category_id = find_category_id_by(category_name, categories_mapping)
        for text in texts:
            sample_vec = extract_feature_vector(text, lda_model, corpora_dict)
            res_dataset.append([*sample_vec, category_id])
    return res_dataset


def prepare_and_save_latent_topics_dataset(lda, dictionary,
                                           latent_dataset='./result/topics/',
                                           prebuilt_dataset='./result/prebuilt_original_dataset'):
    if os.path.exists(latent_dataset):
        d = shelve.open(latent_dataset+'.db')
        res = d['dataset']
        d.close()
        return res

    if not os.path.exists(prebuilt_dataset + '.db'):
        all_dataset = import_data_by_categories()
        save_prebuilt_dataset(all_dataset, prebuilt_dataset)
        save_categories_mapping(all_dataset, CATEGORIES_PATH)

    all_dataset = load_prebuilt_dataset(prebuilt_dataset)
    categories_mapping = load_categories_mapping(CATEGORIES_PATH)

    categories_probs = collect_latent_topics_dataset(original_dataset=all_dataset,
                                                     lda_model=lda,
                                                     corpora_dict=dictionary,
                                                     categories_mapping=categories_mapping)

    os.makedirs(latent_dataset, exist_ok=True)
    d = shelve.open(latent_dataset+'.db')
    d['dataset'] = categories_probs
    d.close()

    return categories_probs


def extract_feature_vector(text, lda_model, corpora_dict):
    a = probs_for_text(text, lda_model, corpora_dict)
    sample_vec = [0 for _ in range(LDA_LATENT_TOPICS)]
    for index, prob in a.items():
        sample_vec[index] = prob
    return sample_vec


def load_lda_corpora():
    lda = models.LdaModel.load(LDA_MODEL_PATH)
    dictionary = corpora.Dictionary.load(CORPORA_DICTIONARY)
    return lda, dictionary


new_text = """
    Добрый день!Пытаюсь бесуспешно установить счетчики и 
    заменить радиаторы в квартире уже 3 неделю. 
    В диспетчерской ничем помочь не могут даже срок 
    не устанавливают говорят что очень много заявок, 
    но тогда хоть в очередь поставьте и скажите КОГДА????.
    Попробую через портал ЖКХ.Спасибо
"""

if __name__ == '__main__':
    lda, dictionary = load_lda_corpora()

    probs = prepare_and_save_latent_topics_dataset(lda, dictionary,
                                                   latent_dataset=LATENT_TOPICS_DATASET,
                                                   prebuilt_dataset=ORIGINAL_CATEGORIAL_DATASET)

    prepared_text = tokenize_lemmatize_filter_stops(new_text)
    print(extract_feature_vector(text=prepared_text,
                                 lda_model=lda,
                                 corpora_dict=dictionary))

    bgw_per_topics = lda.show_topics(num_topics=LDA_LATENT_TOPICS, num_words=10, formatted=False)
    print(bgw_per_topics)
