# MABEL PTQA

> Sistema web para monitoramento de colmeias e qualidade do ar, desenvolvido durante a formação técnica em Desenvolvimento de Sistemas no IFSC.

## Sobre o projeto

O **MABEL PTQA** é um sistema desenvolvido para centralizar e apresentar informações relacionadas ao monitoramento de uma colmeia de abelhas e da qualidade do ar.

O projeto foi desenvolvido durante a disciplina de **Programação 4**, reunindo conhecimentos de desenvolvimento web, backend, banco de dados e visualização de dados em uma única aplicação.

### Objetivo

O objetivo principal do sistema é disponibilizar os dados coletados pelos dispositivos de forma organizada e visual, facilitando seu acompanhamento por meio de uma interface web.

---

## Interface

A aplicação possui uma interface desenvolvida para apresentar as informações de monitoramento de maneira organizada.

### Dashboard

* Dashboard do sistema <img width="1729" height="1194" alt="image" src="https://github.com/user-attachments/assets/b3d8881c-ae2b-46a8-b94f-4017edc92acc" />

### Monitoramento

* Tela de monitoramento PTQA<img width="1918" height="947" alt="image" src="https://github.com/user-attachments/assets/b961d311-cd41-4f65-bf47-25978b8d63dd" />

* Tela de monitoramento MABEL<img width="1918" height="947" alt="image" src="https://github.com/user-attachments/assets/e4c2feee-b05f-4f59-8a37-fbb6845c53d5" />

---

## Funcionalidades

Entre as principais funcionalidades desenvolvidas estão:

* Visualização de informações relacionadas ao monitoramento;
* Apresentação de dados por meio de gráficos;
* Comunicação entre frontend e backend;
* Armazenamento e consulta de dados;
* Integração com banco de dados MySQL;
* Organização dos dados para facilitar sua interpretação;
* Interface web para interação com as informações do sistema.

---

## Arquitetura

O sistema foi organizado em três partes principais:

```text
MABEL PTQA
│
├── Frontend
│   ├── HTML
│   ├── CSS
│   └── JavaScript
│
├── Backend
│   └── PHP
│
└── Banco de Dados
    └── MySQL
```

Essa separação permite dividir as responsabilidades da aplicação entre apresentação, processamento e armazenamento dos dados.

### Fluxo geral

```text
Dispositivos / Dados
        │
        ▼
    Backend
        │
        ▼
   Banco de Dados
        │
        ▼
     Frontend
        │
        ▼
 Visualização dos dados
```
## Tecnologias utilizadas

| Tecnologia | Utilização                                |
| ---------- | ----------------------------------------- |
| PHP        | Desenvolvimento do backend                |
| HTML5      | Estrutura das páginas                     |
| CSS3       | Estilização e layout                      |
| JavaScript | Interatividade e manipulação dos dados    |
| MySQL      | Armazenamento dos dados                   |
| Chart.js   | Criação de gráficos                       |
| ApexCharts | Estudos e testes de visualização de dados (não utilizado) |
| XAMPP      | Ambiente local de desenvolvimento         |
| Git        | Controle de versão                        |
| GitHub     | Hospedagem e versionamento                |

---

## Organização do projeto

A estrutura principal do sistema está dividida da seguinte maneira:

```text
sistemaPrincipal/
├── frontEnd/
├── backEnd/
└── BD/
```

### `frontEnd`

Responsável pela interface da aplicação e pela interação do usuário com os dados apresentados pelo sistema.

### `backEnd`

Responsável pelo processamento das informações e pela comunicação entre a aplicação e o banco de dados.

### `BD`

Contém os arquivos e estruturas relacionados ao banco de dados utilizado pela aplicação.

---

## Banco de dados

O sistema utiliza **MySQL** para armazenar e consultar as informações utilizadas pela aplicação.

* Banco de dados <img width="1217" height="731" alt="image" src="https://github.com/user-attachments/assets/2854c6ef-e9e2-4868-a393-a81a9dfb8b56" />

A utilização de um banco de dados permitiu trabalhar com armazenamento persistente e consulta das informações utilizadas nas diferentes partes do sistema.

---

## Visualização de dados

Uma das partes importantes do projeto foi a apresentação das informações por meio de gráficos.

A utilização de bibliotecas de visualização permitiu transformar os dados armazenados em representações mais fáceis de interpretar.

---

## Desenvolvimento

O projeto foi desenvolvido de forma incremental durante a disciplina de Programação 4.

Durante o desenvolvimento, foram realizados estudos e testes relacionados a:

* Desenvolvimento frontend;
* Desenvolvimento backend;
* Conexão com banco de dados;
* Requisições e comunicação entre as partes do sistema;
* Manipulação de dados;
* Criação de gráficos;
* Organização da estrutura do projeto.

O repositório também contém uma seção de pesquisas e experimentos realizados durante o desenvolvimento.

---

## Desafios

Um dos principais desafios do projeto foi integrar diferentes partes de uma aplicação web em um único sistema.

Além de desenvolver a interface, foi necessário trabalhar com o processamento dos dados, sua persistência no banco de dados e posteriormente sua apresentação ao usuário.

Essa integração permitiu colocar em prática conceitos que, quando estudados separadamente, são mais simples, mas passam a exigir maior organização quando fazem parte da mesma aplicação.

---

## O que desenvolvi com este projeto

O MABEL PTQA contribuiu principalmente para minha experiência com desenvolvimento de aplicações web completas.

Durante o projeto, pratiquei:

* Estruturação de aplicações web;
* Separação entre frontend, backend e banco de dados;
* Desenvolvimento utilizando PHP;
* Manipulação de dados com JavaScript;
* Utilização de MySQL;
* Criação de visualizações de dados;
* Organização de código e arquivos;
* Utilização de Git e GitHub;
* Desenvolvimento incremental de uma aplicação.

---

## Como executar

O projeto foi desenvolvido para execução em ambiente local utilizando **XAMPP**.

### 1. Clone o repositório

```bash
git clone https://github.com/AnthonyTestaH846/2025-2-anthony-testaHentges-prog4
```

### 2. Configure o ambiente

Coloque os arquivos do projeto no diretório utilizado pelo servidor local do XAMPP.

### 3. Configure o banco de dados

Utilize os arquivos presentes em:

```text
sistemaPrincipal/BD/
```

para configurar o banco de dados MySQL.

### 4. Inicie os serviços

No XAMPP, inicie os serviços necessários para o funcionamento da aplicação, incluindo o servidor web e o MySQL.

### 5. Acesse a aplicação

Após a configuração, acesse o projeto pelo navegador através do servidor local.

> A configuração pode variar de acordo com o ambiente utilizado e com a versão atual do projeto.

---

## Contexto acadêmico

O MABEL PTQA foi desenvolvido como parte da disciplina de **Programação 4** do curso técnico em Desenvolvimento de Sistemas do **Instituto Federal de Santa Catarina (IFSC)**.

O projeto teve como objetivo aplicar, em uma aplicação integrada, conhecimentos de desenvolvimento web, banco de dados e visualização de informações.

---

## Repositório

[GitHub — MABEL PTQA](https://github.com/AnthonyTestaH846/2025-2-anthony-testaHentges-prog4)

---

**Curso:** Técnico em Desenvolvimento de Sistemas — IFSC
**Projeto desenvolvido em:** 2025
