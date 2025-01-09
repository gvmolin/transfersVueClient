# Projeto de Consulta de Endereços por CEP

Este projeto é uma aplicação frontend que consome uma API externa para realizar consultas de endereços por CEP. A proposta de utilizar uma API externa é interessante porque a aplicação não contém regras de negócio complexas, focando apenas na exibição dos dados retornados.

## Tecnologias Utilizadas

- **Vue 3**
- **TypeScript**
- **Element Plus**
- **Pinia**

## Razões para as Escolhas Tecnológicas

### Vue 3 com TypeScript

Optamos por utilizar Vue 3 juntamente com TypeScript para aproveitar a tipagem estática que o TypeScript oferece, o que melhora a robustez do código e facilita a detecção de erros durante o desenvolvimento. Além disso, a abordagem do "script setup" na Composition API do Vue 3 se mostrou mais interessante para este projeto, pois permite um código mais limpo e conciso.

### Element Plus

O Element Plus foi escolhido como biblioteca de componentes UI devido à sua vasta gama de componentes prontos para uso, documentação abrangente e excelente integração com Vue 3.

### Pinia

Preferimos utilizar o Pinia em vez do Vuex 3, pois ele é a solução de estado oficial para Vue 3. O Pinia oferece uma API mais simples e intuitiva, além de ser totalmente compatível com TypeScript, o que se alinha perfeitamente com os objetivos do nosso projeto.

## Como Executar o Projeto

1. Clone o repositório:

   ```bash
   cd projeto-cep
   ```

2. Instale as dependências e execute a aplicação:

   ```bash
   yarn install
   yarn dev
   ```