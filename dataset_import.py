import re
import pymorphy2
import pandas as pd


def read_excel_df(path, list_name='Sheet1'):
    return pd.read_excel(path, list_name)


def df_to_list(df):
    dict = df_to_dict(df)
    res = []
    for i in dict:
        res.extend(dict[i])
    return res


def df_to_dict(df):
    cols = [
        'LINK',
        'D_Date_Plan',
        'C_Appart_Number'
    ]
    papers = df.drop(columns=cols, axis=1)
    papers = papers.dropna()
    res = {}
    for index, row in papers.iterrows():
        category_name = row['C_Name']
        content = ' '.join([row['C_Short_Name'], row['C_Name'], row['C_FIO'], row['C_Comment']])
        try:
            res[category_name].append(content)
        except KeyError:
            res[category_name] = [content, ]
    return res


def tokenize_lemmatize_filter_stops(line):
    morph = pymorphy2.MorphAnalyzer()
    tokenized_line = []
    words = re.split(';|,|\)|\(|"|\]|\[| |-\?«0123456789\.»/№', line)
    for w in words:
        if not w:
            continue
        i = morph.parse(w)[0].normal_form.lower()
        if i not in WORDS:
            tokenized_line.append(i)
    return tokenized_line


def import_data(path='./data/sample_dataset.xlsx'):
    dataset_df = read_excel_df(path)
    rows = df_to_list(dataset_df)
    return [tokenize_lemmatize_filter_stops(i) for i in rows]


def import_data_by_categories(path='./data/sample_dataset.xlsx'):
    dataset_df = read_excel_df(path)
    res = df_to_dict(dataset_df)
    final_dict = {}
    for category, texts in res.items():
        tmp = []
        for text in texts:
            tmp.append(tokenize_lemmatize_filter_stops(text))
        final_dict[category] = tmp
    return final_dict


WORDS = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'a', 'b',
    'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'л', 'м', 'н', 'о',
    'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ш', 'щ', 'ъ', 'ь', 'э', 'ю', 'я',
    'большой', 'бы', 'быть', 'в', 'весь', 'вот', 'все',
    'всей', 'вы', 'говорить', 'год', 'да', 'для', 'до', 'еще',
    'же', 'знать', 'и', 'из', 'к', 'как', 'который', 'мочь',
    'мы', 'на', 'наш', 'не', 'него', 'нее', 'нет', 'них', 'но',
    'о', 'один', 'она', 'они', 'оно', 'оный', 'от', 'ото', 'по',
    'с', 'свой', 'себя', 'сказать', 'та', 'такой', 'только', 'тот',
    'ты', 'у', 'что', 'это', 'этот', 'я', 'без', 'более', 'больше',
    'будет', 'будто', 'бы', 'был', 'была', 'были', 'было', 'быть',
    'вам', 'вас', 'ведь', 'весь', 'вдоль', 'вдруг', 'вместо',
    'вне', 'вниз', 'внизу', 'внутри', 'во', 'вокруг', 'вот',
    'впрочем', 'все', 'всегда', 'всего', 'всех', 'всю', 'вы',
    'где', 'да', 'давай', 'давать', 'даже', 'для', 'до',
    'достаточно', 'другой', 'его', 'ему', 'ее', 'её', 'ей', 'если',
    'есть', 'ещё', 'еще', 'же', 'за', 'за исключением', 'здесь',
    'из', 'из-за', 'из', 'или', 'им', 'иметь', 'иногда', 'их',
    'как-то', 'кто', 'когда', 'кроме', 'кто', 'куда', 'ли', 'либо',
    'между', 'меня', 'мне', 'много', 'может', 'мое', 'моё', 'мои',
    'мой', 'мы', 'на', 'навсегда', 'над', 'надо', 'наконец', 'нас',
    'наш', 'не', 'него', 'неё', 'нее', 'ней', 'нет', 'ни',
    'нибудь', 'никогда', 'ним', 'них', 'ничего', 'но', 'ну', 'об',
    'однако', 'он', 'она', 'они', 'оно', 'опять', 'от', 'отчего',
    'очень', 'перед', 'по', 'под', 'после', 'потом', 'потому',
    'потому что', 'почти', 'при', 'про', 'раз', 'разве', 'свою',
    'себя', 'сказать', 'снова', 'с', 'со', 'совсем', 'так', 'также',
    'такие', 'такой', 'там', 'те', 'тебя', 'тем', 'теперь',
    'то', 'тогда', 'того', 'тоже', 'той', 'только', 'том', 'тот',
    'тут', 'ты', 'уже', 'хоть', 'хотя', 'чего', 'чего-то', 'чей',
    'чем', 'через', 'что', 'что-то', 'чтоб', 'чтобы', 'чуть',
    'чьё', 'чья', 'эта', 'эти', 'это', 'эту', 'этого', 'этом',
    'этот', 'к', 'ооо', 'т.к.', '№'
]

if __name__ == '__main__':
    print(import_data())
