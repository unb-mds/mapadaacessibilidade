## Pasta hooks

A pasta hooks contém funções reutilizáveis do tipo React Hook, que encapsulam lógicas específicas para serem usadas em componentes funcionais do React. Esses hooks facilitam a reutilização de comportamentos, como manipulação de estado, efeitos colaterais, notificações, entre outros, promovendo organização e padronização do código.

---

### Arquivo `use-toast.js`

O arquivo `use-toast.js` implementa um hook customizado chamado useToast, responsável por exibir notificações do tipo "toast" na interface do usuário. Ele utiliza a biblioteca react-toastify para mostrar mensagens rápidas no canto superior direito da tela, podendo ser usadas para avisos, erros ou confirmações.

**Como funciona**

* O hook retorna uma função chamada toast, que pode ser chamada em qualquer componente React para exibir uma notificação personalizada.

* Permite definir o título, a descrição e o tipo da notificação (ex: sucesso, erro, info).

Exemplo de uso:

```javascript
// Exemplo de uso do useToast em um componente React
import { useToast } from '../hooks/use-toast';

function MeuComponente() {
  const { toast } = useToast();

  const handleClick = () => {
    toast('Sucesso', 'Ação realizada com sucesso!', 'success');
  };

  return <button onClick={handleClick}>Mostrar Toast</button>;
}
```

### Resumo

Pasta hooks: Centraliza hooks customizados reutilizáveis do projeto.
Arquivo use-toast.js: Fornece um hook para exibir notificações toast de forma padronizada em toda a aplicação React.

---

### Exemplo Básico

```javascript
// Exemplo básico de uso do useToast em um componente React

import React from 'react';
import { useToast } from '../hooks/use-toast';

function ExemploToast() {
  const { toast } = useToast();

  const handleClick = () => {
    toast('Bem-vindo', 'Você acessou o sistema com sucesso!', 'success');
  };

  return (
    <button onClick={handleClick}>
      Mostrar Toast de Sucesso
    </button>
  );
}

export default ExemploToast;
```

**Como funciona:**

Ao clicar no botão, será exibida uma notificação no canto superior direito da tela com o título "Bem-vindo" e a mensagem "Você acessou o sistema com sucesso!", utilizando o estilo de sucesso.

Esse exemplo pode ser adaptado para mostrar mensagens de erro, aviso ou informações, bastando alterar o parâmetro variant para `error`, `warning`, `info` ou `default`.