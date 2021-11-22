# Desaio Golden Raspberry Awards
Este desaio tem por objetivo ler um arquivo csv com dados dos ilmes indicados e ganhadores do prêmio e extrair dados a partir da base erada.

### Como usar
 - Após clonar o projeto execute `npm install` ou `yarn install` para instalar todas as dependências do mesmo.
 - Se desejar que um arquivo seja carregado já na inicialização do servidor, adicione-o na raíz do projeto como nome `movielist.csv`
 - Ao executar o comando `npm run dev`, o servidor será inicializado e o projeto estará pronto para receber as requisições. Caso seja localizado um arquivo, conforme instruções anteriores, o mesmo será carregado e será gerada a base de dados.

## Endpoints disponíveis

### Cadastro de filmes
```sh
curl --request POST \
  --url http://localhost:8000/movies \
  --header 'Content-Type: application/json' \
  --data '{
	"year": 2011,
	"title": "Título do filme",
	"studios": "Nome da produtora do filme",
	"producers": "Autores, separados por vírgula",
	"winner": "yes"
}'
```

### Importar listagem a partir de csv
O arquivo .csv deve conter os dados separadospor ";", sendo a primeira linha os nomes das colunas. É obriarório que o arquivos contenha as seguintes colunas: ``year, title, studios, producers, winner``, não necessariamente nesta ordem

```sh
curl --request POST \
  --url http://localhost:8000/movies/import \
  --header 'Content-Type: multipart/form-data;' \
  --form 'file=path_to_csv.csv'
```

### Visualizar as estatísticas dos ganhadores
```sh
curl --request GET \
  --url http://localhost:8000/movies/statistics
```

## Testes
Os testes de integração podem ser executados a partir do comando `npm run test` ou `yarn test`