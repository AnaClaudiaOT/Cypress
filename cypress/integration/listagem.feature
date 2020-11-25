Feature: Listagem

    Como usuário, desejo acessar a listagem
    Para que possa visualizar meus dados

Scenario: Listagem sem registros
    Given que o site nao possui registros
    When o usuario acessar a listagem
    Then o usario deve visualizar a lista vazia

Scenario: Listagem com apenas um registro
    Given que o site possua apenas um registro
    When o usuario acessar a listagem
    Then o usuario devera visualizar apenas um registro 