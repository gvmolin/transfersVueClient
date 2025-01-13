## Tecnologias Utilizadas

- **Vue 3**
- **TypeScript**
- **Element Plus**
- **Pinia**
- **Axios**
- **Vite**
- **FontAwesome**
- **Sass**
- **Vue Router**
- **Yarn** e **NPM**

## Razões para as Escolhas Tecnológicas

### Vue 3 com TypeScript
Optamos por utilizar Vue 3 juntamente com TypeScript para aproveitar a tipagem estática que o TypeScript oferece, melhorando a robustez do código e facilitando a detecção de erros durante o desenvolvimento. A abordagem do "script setup" na Composition API do Vue 3 proporciona um código mais limpo e conciso, alinhado com as melhores práticas do ecossistema Vue.

### Element Plus
O Element Plus foi escolhido como biblioteca de componentes UI devido à sua vasta gama de componentes prontos para uso, documentação abrangente e excelente integração com Vue 3. Ele oferece uma solução moderna e bem documentada para criar interfaces de usuário intuitivas e responsivas.

### Pinia
Optamos por utilizar Pinia em vez do Vuex 3 como gerenciamento de estado, pois o Pinia é a solução oficial para Vue 3. Ele oferece uma API mais simples e intuitiva, sendo totalmente compatível com TypeScript, o que facilita o desenvolvimento e manutenção do projeto.

### Axios
**Axios** foi escolhido para realizar requisições HTTP devido à sua simplicidade e robustez. A biblioteca permite a manipulação eficiente de requisições assíncronas e é totalmente compatível com TypeScript, garantindo tipagem estática nas respostas e simplificando o processo de integração com APIs externas.

### Vite
Escolhemos **Vite** como bundler e servidor de desenvolvimento devido à sua velocidade e desempenho superior em comparação com outras ferramentas, como o Webpack. O Vite utiliza ESBuild para construção e oferece suporte nativo a Vue 3 e TypeScript, proporcionando uma experiência de desenvolvimento mais rápida e produtiva.

### FontAwesome
A biblioteca **FontAwesome** foi utilizada para incluir ícones na interface do usuário. Com uma grande variedade de ícones prontos para uso, a FontAwesome facilita a criação de uma interface visualmente atraente e intuitiva, contribuindo para uma melhor experiência do usuário.

### Sass
A escolha do **Sass** como pré-processador CSS visa otimizar o desenvolvimento de estilos, permitindo o uso de variáveis, mixins e aninhamento de seletores. Isso torna o código CSS mais modular, reutilizável e fácil de manter, principalmente em projetos de maior escala.

### Vue Router
**Vue Router** foi implementado para gerenciar a navegação entre as páginas do sistema. Ele oferece uma API poderosa e simples de usar, com suporte a navegação dinâmica, lazy loading de componentes e parâmetros de URL, o que facilita a criação de uma experiência de navegação fluida.

### Yarn e NPM
O projeto utiliza **Yarn** para gerenciamento de dependências, devido à sua performance superior em comparação com o NPM em termos de instalação de pacotes e resolução de dependências. Embora o **NPM** também seja compatível com o projeto, o Yarn é o gerenciador de pacotes preferido para este fluxo de trabalho. 

Essas tecnologias foram escolhidas para garantir uma aplicação eficiente, escalável e fácil de manter, ao mesmo tempo em que proporcionam uma excelente experiência tanto para desenvolvedores quanto para usuários finais.

## Como Executar o Projeto

1. Clone o repositório:

   ```bash
   git clone https://github.com/gabrielmolin-urbano/transfersSpringBootAPI
   ```

2. Abra o diretório:

   ```bash
   cd transfersVueClient
   ```

3. Abra o diretório:
   Clone o '.env.example' como '.env' e mude as variáveis se necessário

4. Instale as dependências e execute a aplicação:

   ```bash
   yarn install
   yarn dev
   ```

------------------------------------------
## Progresso geral

### Feito
- Estrutura inicial (vue3 + router + axios + pinia + elementplus + fontsawesome, etc)
- Tela de listagem de usuários
- Formulário de criação e atualização de usuários
- Validação inicial de usuários
- Tela de listagem de transferências
- Formulário de criação de transferências
- Validação inicial de transferências
- Validação assíncrona do 'valor de transferencia' x 'saldo em conta'
- Notificações de erro e sucesso 

### A fazer
- Sistema de paginação (tabelas)
- Sistema de filtragem (tabelas)
- Sistema de ordenação (tabelas)
- Melhorias nas validações dos formulários:
- - Implementação de novas regras
- - Mostragem de retornos de erro de validação
- Tela de login
- Sistema de autenticação
- Melhorias de layout