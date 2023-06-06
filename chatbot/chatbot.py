from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
import numpy as np
import random
import string

app = Flask(__name__)
CORS(app)

# 1 DEFINICIÓN CORPUS

f=open(r'chatbot/Corpus_crucero.txt','r',errors = 'ignore')
raw=f.read()

# 2a Preprocesamiento del Texto con NTLK CORPUS

raw=raw.lower()# convertir en minúscula
#nltk.download('punkt') # Instalar módulo punkt si no está ya instalado (solo ejecutar la primera vez)
#nltk.download('wordnet') # Instalar módulo wordnet si no está ya instalado (solo ejecutar la primera vez)
sent_tokens = nltk.sent_tokenize(raw)# Convierte el CORPUS a una lista de sentencias
word_tokens = nltk.word_tokenize(raw)# Convierte el CORPUS a una lista de palabras
lemmer = nltk.stem.WordNetLemmatizer()

#WordNet diccionario semántico incluido en NLTK
def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)
def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

# 2b PREPROCESAMIENTO DEL TEXTO + 3 Evaluar Similitud MENSAJE USUARIO - CORPUS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.corpus import stopwords

#Función para determinar la similitud del texto insertado y el corpus
'''def response(user_response):
    robo_response=''
    sent_tokens.append(user_response) #Añade al corpus la respuesta de usuario al final
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words=stopwords.words('spanish'))
    tfidf = TfidfVec.fit_transform(sent_tokens)
    # 3 EVALUAR SIMILITUD DE COSENO ENTRE MENSAJE USUARIO (tfidf[-1]) y el CORPUS (tfidf)
    vals = cosine_similarity(tfidf[-1], tfidf)
    idx=vals.argsort()[0][-2]
    flat = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    
    if(req_tfidf==0):
        robo_response=robo_response+"Lo siento, no te he entendido. Si no puedo responder a lo que busca póngase en contacto con soporte@soporte.com"
        return robo_response

    else:
        robo_response = robo_response+sent_tokens[idx]
        return robo_response'''
def response(user_response):
    robo_response=''
    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words=stopwords.words('spanish'))
    tfidf = TfidfVec.fit_transform(sent_tokens[:-1])  # Excluir la última respuesta del usuario
    tfidf_user = TfidfVec.transform([user_response])  # Transformar la respuesta del usuario en un vector TF-IDF
    
    # Calcular la similitud del coseno entre la respuesta del usuario y el corpus
    vals = cosine_similarity(tfidf_user, tfidf)
    idx = vals.argsort()[0][-1]  # Obtener el índice de la respuesta más similar
    req_tfidf = vals[0][idx]
    
    if req_tfidf == 0:
        robo_response = "Lo siento, no te he entendido. Si no puedo responder a lo que buscas, " \
                        "ponte en contacto con soporte@soporte.com"
        return robo_response
    else:
        robo_response = sent_tokens[idx]
        return robo_response
    
# 4 DEFINICIÓN DE COINCIDENCIAS MANUAL

SALUDOS_INPUTS = ("hola", "buenas", "saludos", "qué tal", "hey","buenos dias",)
SALUDOS_OUTPUTS = ["Hola", "Hola, ¿Qué tal?", "Hola, ¿Cómo te puedo ayudar?", "Hola, encantado de hablar contigo"]

def saludos(sentence):
    for word in sentence.split():
        if word.lower() in SALUDOS_INPUTS:
            return random.choice(SALUDOS_OUTPUTS)

# 5 GENERACIÓN DE RESPUESTA

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    user_response = data['question']

    # Lógica del chatbot
    if user_response.lower() == 'salir':
        return jsonify({'response': 'Nos vemos pronto, ¡cuídate!'})

    if user_response.lower() in ['gracias', 'muchas gracias']:
        return jsonify({'response': 'No hay de qué'})

    if saludos(user_response) is not None:
        return jsonify({'response': saludos(user_response)})

    response_text = response(user_response)
    return jsonify({'response': response_text})

if __name__ == '__main__':
    app.run(debug=True,port=5000)


