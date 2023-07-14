# Portaria Green

## ✨ Projeto

Portaria Green é uma aplicação baseada em uma API de condomínio. Um usuário pode cadastrar novos lotes, enviar arquivos .csv com boletos exportados de outra aplicação, enviar arquivos .pdf com boletos a serem pagos pelos condôminos que também são exportados de outra aplicação e por fim listar informações de boletos e gerar um base64 com essas informações. 

<br>


## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias/bibliotecas:

<table border="0">
 <tr>
<td> NestJS</td>
<td> Typescript</td>
<td> TypeOrm</td>
 </tr>
  <tr>
<td> Csv-parser</td>
<td> Pdf-lib</td>
<td> Multer</td>
 </tr>
  <tr>
<td> TypeOrm</td>
<td> PostgreSQL</td>
<td> Postman</td>
 </tr>
 
</table>

<br>

## 👨🏻‍💻 Instalando o projeto

Rode um dos comandos abaixo:

```cl
yarn
```

ou

```cl
npm install
```

<br>

### 💿 Rodando o projeto

Crie um banco de dados e no seu arquivo .env, defina suas configurações.
Após isso rode seu servidor:

```cl
npm run start:dev
```

```cl
yarn start:dev
```




## 📜 Documentação:

Com o servidor roando, acesse a URL abaixo e tenha acesso à documentação e testes no Postman.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.postman.com/bold-star-835522/workspace/my-workspace/documentation/11009484-85ccb0d2-0f4d-4500-a5dd-f29ad505e77c?entity=&branch=&version=)


<br>
<br>

## 📅 Organização

O PDF criado esta na pasta
```cl
./utils/boletos.pdf
``` 
O csv criado esta na pasta
```cl
./utils/file.csv
``` 

Os arquivos .csv utilizam a seguinte pasta para serem salvos temporariamente enquanto são registrados no banco de dados.
```cl
./uploads/csv
``` 

Os arquivos .pdf dos boletos apos serem gerados sao salvos na seguinte pasta
```cl
./uploads/pdf
``` 

<br>
<br>