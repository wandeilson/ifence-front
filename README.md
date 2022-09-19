# ifence-front

### Dependências para instalação:

- Node.js (versão 16.16.0 foi utilizada durante o desenvolvimento);
- Git.

### Obtendo o código-fonte:

Crie uma nova pasta com o nome *childfence*.(OBS: você pode reutilizar a pasta criada na aplicação backend)

Com o Git instalado em seu computador, abre um terminal de linha de comando (no Windows o Git Bash ou WSL) nessa pasta.

Cole o comando descrito abaixo:

```bash
git clone https://github.com/FilipeFariasC/projeto-dac-2022.1-frontend.git
```
### Configurando e executando:

Na linha de comando, ntre no diretório do projeto:

```bash
cd /{caminho}/{até}/{repositório}/projeto-dac-2022.1-frontend
```

Ainda na linha de comando, instale todas as dependências da aplicação

```bash
npm install 
```

**CASO ALGUM ERRO ACONTEÇA, TENTE:**

```bash
npm install --legacy-peer-deps
```
#### Configurando o Google Maps:

Esse projeto faz o uso da API do Google Maps, e por isso se faz necessário uma chave de acesso a essa API.
**Para isso será necessário você informar a sua chave de acesso manualmente.**
Na raiz do projeto, criei um arquivo com o nome " ***.env*** ".

Dentro do arquivo ***.env***, insira o seguinte texto:

```
REACT_APP_GOOGLE_MAPS_API_KEY={CHAVE}
```
Substitua *{CHAVE}* pela sua chave de acesso.

NÃO SABE COMO CONSEGUIR UMA CHAVE DE ACESSO? acesse esse [link](https://developers.google.com/maps/documentation/javascript/get-api-key?hl=pt-br)(em inglês).

#### Executando a aplicação

Para a execução da aplicação, digite:

```bash
npm start
```

OBSERVAÇÕES FINAIS: Após seguir todos os passos acima você terá a aplicação funcionando LOCALMENTE, e apenas terá o funcionamento completo se o [backend](https://github.com/elenilsonvieira/ifence-back) da aplicação estiver executando em paralelo.
