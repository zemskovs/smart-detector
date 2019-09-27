import os
import shelve

from gensim import corpora, models

from dataset_import import tokenize_lemmatize_filter_stops, import_data_by_categories


def probs_for_text(text, lda_model, corpora_dict):
    doc_bow = corpora_dict.doc2bow(text)
    doc_lda = lda_model[doc_bow]
    distribution = {}
    for topicNum, probability in doc_lda:
        distribution[topicNum] = probability
    return distribution


def collect_probs_for_categories(dataset, lda_model, corpora_dict, threshold=0.4):
    res_probs = {}
    for category, texts in dataset.items():
        probs = {}
        for text in texts:
            a = probs_for_text(text, lda_model, corpora_dict)
            for key, value in a.items():
                if value >= threshold and \
                        (key not in probs or (key in probs and value >= probs[key])):
                    probs[key] = value
        res_probs[category] = probs
    return res_probs


def extract_probs(lda, dictionary, p='./result/topics/'):
    name = 'topics.dict'
    if not os.path.exists(os.path.join(p, 'topics.dict.db')):
        all_dataset = import_data_by_categories()
        categories_probs = collect_probs_for_categories(all_dataset, lda, dictionary)
        os.makedirs(p, exist_ok=True)
        d = shelve.open(os.path.join(p, name))
        d['categories_probs'] = categories_probs
        d.close()
        return categories_probs
    d = shelve.open(os.path.join(p, name))
    res = d['categories_probs']
    d.close()
    return res


new_text = """
    Добрый день!Пытаюсь бесуспешно установить счетчики и 
    заменить радиаторы в квартире уже 3 неделю. 
    В диспетчерской ничем помочь не могут даже срок 
    не устанавливают говорят что очень много заявок, 
    но тогда хоть в очередь поставьте и скажите КОГДА????.
    Попробую через портал ЖКХ.Спасибо
"""

if __name__ == '__main__':
    lda = models.LdaModel.load('./result/lda/sample_model.lda')
    dictionary = corpora.Dictionary.load('./result/dict/sample.dict')

    probs = extract_probs(lda, dictionary)

    prepared_text = tokenize_lemmatize_filter_stops(new_text)
    print(probs_for_text(text=prepared_text,
                         lda_model=lda,
                         corpora_dict=dictionary))
    NUM_TOPICS = 50
    bgw_per_topics = lda.show_topics(num_topics=NUM_TOPICS, num_words=10, formatted=False)
    print(bgw_per_topics)
