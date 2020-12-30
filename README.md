# awesome-view-pager-flat-list

# Motivação
No meu trabalho apareceu uma demanda em que eu tinha que criar um pequeno modal, onde houvesse um "ViewPager" para demonstrar um pequeno tutorial de uma funcionalidade em 3 passos.
Verifiquei que já existe uma _lib_ para react-native que fornece o componente de [ViewPager](https://github.com/callstack/react-native-viewpager) já pronto. Mas como o projeto já tem muitas libs, tento sempre procurar não adicionar libs desnecessárias, com o intuito de manter o tamanho do _bundle_ do app o menor possível. Assim, como eu sabia que não precisaria de todas as funcionalidade de uma ViewPager, que são muitas, pesquisei como eu poderia criar uma, em que tivesse três páginas onde eu desse um "swipe" para direita ou para esquerda e a página fosse mudada, isso tudo apenas com componentes já existentes do react-native.
Uma das maiores motivações para a criação deste artigo também é que não achei muito conteúdo em português abordando este assunto.

# ViewPager
Para um melhor entendimento do que seria um ViewPager decidi colocar o gif abaixo. Consegui esse .gif a partir deste repositório 
(https://github.com/afollestad/viewpagerdots):

![ViewPager](https://raw.githubusercontent.com/afollestad/viewpagerdots/master/assets/demo.gif)

Acredito que muitos já viram, esse componente é muito comum na parte de tutorial das aplicações.

# Vamos codar
Primeiramente, irei criar apenas um botão onde será possível clicar para aparecer o modal onde haverá a tão citada "ViewPager":
```javascript

<Pressable
        style={styles.openViewPagerModalButton}
      >
        <Text>Open the most awesome view pager modal!</Text>
</Pressable>
```
Para exemplificar, criei um array de objetos que contém o texto que aparecerá em cada "página":
```javascript
const texts = [
    {
      id: "1",
      text: "Teste 1",
    },
    {
      id: "2",
      text: "Teste 2",
    },
    {
      id: "3",
      text: "Teste 3",
    },
  ];
```
Criei um [estado](https://pt-br.reactjs.org/docs/hooks-state.html)  que vai controlar a visibilidade do modal:
```javascript
 const [viewPagerModalIsVisible, setViewPagerModalIsVisible] = useState(true);
```
E logo abaixo segue o código da cereja do bolo :cherries::
```javascript
<Modal visible={viewPagerModalIsVisible}>
        <View style={styles.modalMainContainer}>
          <View style={styles.modalSubContainer}>
            <FlatList
              contentContainerStyle={styles.alignItemsCenter}
              data={texts}
              horizontal
              keyExtractor={(item) => item.id}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Text style={styles.viewPagerTextStyle}>{item.text}</Text>
              )}
            />
          </View>
       </View>
</Modal>
```
Basicamente, criei uma [FlatList](https://reactnative.dev/docs/flatlist) em que seu scroll é [horizontal](https://reactnative.dev/docs/flatlist#horizontal), usando a prop _horizontal_, e com paginação, usando a prop [_pagingEnabled_](https://reactnative.dev/docs/scrollview#pagingenabled). Cada item da lista, com o estilo _viewPagerTextStyle_, tem a largura da View de estilo _modalSubContainer_, fazendo com que a lista se comporte não como um scroll contínuo mas como um _ViewPager_, ou seja, basta dar um _swipe_ para direita ou esquerda que a página será passada para o lado correspondente. Esse comportamento está demonstrado no gif abaixo:
![t_video5120910380561858722](https://dev-to-uploads.s3.amazonaws.com/i/z187i3q77mr0g5olr422.gif)

Código de estilização do _modalSubContainer_ e do viewPagerTextStyle:
 ```javascript
 modalSubContainer: {
    backgroundColor: "#FFF",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 190,
    width: 320,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 10,
  },
viewPagerTextStyle: {
    width: 320,
    textAlign: "center",
  },
```
# Indicação das páginas
Para ficar exatamente igual a um ViewPager temos que adicionar aqueles "pontinhos" que indicam qual página o usuário está. Para isso, vamos adicionar uma lib chamada react-native-dots-pagination (https://github.com/tsepeti/react-native-dots-pagination). Para instalá-la, basta usar o comando abaixo caso você use o yarn: 

 ```shell
yarn add react-native-dots-pagination
```
Case você utilize o npm:
```shell
npm install react-native-dots-pagination
```
Deve ser criado um state que controlará o "pontinho" que está ativo:
```javascript
 const [activeDot, setActiveDot] = useState(0);
```
Antes de adicionar os "pontinhos" na tela, eu preciso saber em qual "página" minha lista está, para isso, preciso adicionar as _props_ [_onViewableItemsChanged_](https://reactnative.dev/docs/flatlist#onviewableitemschanged) e [_viewabilityConfig_](https://reactnative.dev/docs/flatlist#viewabilityconfig) na FlatList:
```javascript
<FlatList
  contentContainerStyle={styles.alignItemsCenter}
  data={texts}
  horizontal
  keyExtractor={(item) => item.id}
  pagingEnabled
  onViewableItemsChanged={handleVieweableItemsChanged}
  viewabilityConfig={viewabilityConfig}
  showsHorizontalScrollIndicator={false}
  renderItem={({ item }) => (
  <Text style={styles.viewPagerTextStyle}>{item.text}</Text>
)}
  />
```
A prop _onViewableItemsChanged_ serve para executar uma função toda vez que a visibilidade de cada item da lista mudar. Para o nosso caso, toda vez que mudarmos de página, a função _handleVieweableItemsChanged_ será chamada:
```javascript
const handleVieweableItemsChanged = useCallback(({ viewableItems }) => {
    setActiveDot(viewableItems[0].index);
  }, []);
```
Quando essa função for executada será alterado o "pontinho" que está ativo, ou seja, quando estiver na primeira página, o primeiro "pontinho" será ativado e assim respectivamente.

A prop _viewabilityConfig_ é usada para informar diversos parâmetros que irão influenciar na prop _onViewableItemsChanged_. Para o nosso caso irei criar um objeto, para passar na prop, com um o atributo que informa o quanto do item é necessário está disposto no layout para informar que o mesmo está visível. O nome desse atributo é [_itemVisiblePercentThreshold_](https://reactnative.dev/docs/flatlist#viewabilityconfig):
```javascript
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
```
Basta 50% do item já está visível que a função _handleVieweableItemsChanged_ será chamada.


O componente para os "pontinhos" segue logo abaixo:
```javascript
    <Dots
     activeDotWidth={6}
     activeDotHeight={6}
     passiveDotHeight={6}
     passiveDotWidth={6}
     length={3}
     activeColor={"#000"}
     active={activeDot}
     />
```
_____________________________________________________________
Link para o código completo: https://github.com/gabrielsideprojects/awesome-view-pager-flat-list.

Estou aberto a pull requests e sugestões para o código e o artigo. Sintam-se à vontade :smiley:.

Utilizei o [Expo](https://expo.io/) para a criação do aplicativo.

Para tomarmos um café bem quentinho, só mandar um "oi" lá no meu [Linkedin](https://www.linkedin.com/in/gabrielmenezesdev/) :smiley: :coffee:.

# *English Version*

# Motivation
At my job, a demand appeared where I needed to create a  modal that should have a ViewPager to demonstrate a three step tutorial for a functionality within the app.
I checked that there is a react-native's library that provides the ViewPager component ready. But as the project has a lot of libs already, I always try to not put unnecessary libs, in order to maintain the size of the bundle as small as possible. Therefore, as I know that I would not need all functionalities of the ViewPager, which are a lot, I searched how I would create one, in which I had three pages where I would swipe to right or left and the page was changed, all of this just with components that exists in react-native already.

# ViewPager
To better understand what is a ViewPager, I decided to put the gif below. I got this .gif from this repository (https://github.com/afollestad/viewpagerdots) :

![ViewPager](https://raw.githubusercontent.com/afollestad/viewpagerdots/master/assets/demo.gif)

I believe that a lot of people saw this component already, since this component is very common in the tutorial session of the applications.

# Let's Code
First, I'm going to create a button where when pressed, a modal with the ViewPager will show up:
```javascript

<Pressable
        style={styles.openViewPagerModalButton}
      >
        <Text>Open the most awesome view pager modal!</Text>
</Pressable>
```
For this example, I created an array with the objects that represents the text which will appear in each page:
```javascript
const texts = [
    {
      id: "1",
      text: "Teste 1",
    },
    {
      id: "2",
      text: "Teste 2",
    },
    {
      id: "3",
      text: "Teste 3",
    },
  ];
```
I created a [state](https://reactjs.org/docs/hooks-state.html#gatsby-focus-wrapper) that is going to control the visibility of the modal:
```javascript
 const [viewPagerModalIsVisible, setViewPagerModalIsVisible] = useState(true);
```
Right below is the frosting on the cake :cake::
```javascript
<Modal visible={viewPagerModalIsVisible}>
        <View style={styles.modalMainContainer}>
          <View style={styles.modalSubContainer}>
            <FlatList
              contentContainerStyle={styles.alignItemsCenter}
              data={texts}
              horizontal
              keyExtractor={(item) => item.id}
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <Text style={styles.viewPagerTextStyle}>{item.text}</Text>
              )}
            />
          </View>
       </View>
</Modal>
```
Basically, I created a [FlatList](https://reactnative.dev/docs/flatlist) where its scroll is [horizontal](https://reactnative.dev/docs/flatlist#horizontal), using the prop _horizontal_, and with pagination, using the prop [_pagingEnabled_](https://reactnative.dev/docs/scrollview#pagingenabled). Each item of the list, which has the style _viewPagerTextStyle_, has the size of the View with style _modalSubContainer_, making the list behave not as a continuous scroll but as a _ViewPager_. That is, you just have to _swipe_ to the right or to the the left that the page will change accordingly.
This behavior is shown in the gif below:


![t_video5120910380561858722](https://dev-to-uploads.s3.amazonaws.com/i/z187i3q77mr0g5olr422.gif)

Stylization code of _modalSubContainer_ and _viewPagerTextStyle_:
 ```javascript
 modalSubContainer: {
    backgroundColor: "#FFF",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 190,
    width: 320,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 10,
  },
viewPagerTextStyle: {
    width: 320,
    textAlign: "center",
  },
```
# Indication of pages
To be exactly equal to a ViewPager we have to add that "small dots" which indicates the page that the user is. To do this, we're going to add a lib called [react-native-dots-pagination](https://github.com/tsepeti/react-native-dots-pagination). To install it, just use the command below if you use yarn:

 ```shell
yarn add react-native-dots-pagination
```
If you use npm:
```shell
npm install react-native-dots-pagination
```
It must be created a state that is going to control which pagination dot is active:
```javascript
 const [activeDot, setActiveDot] = useState(0);
```
Before adding the "small dots" in my screen, I need to know which page of my list the user is, in order to do this, I need to add the props [_onViewableItemsChanged_](https://reactnative.dev/docs/flatlist#onviewableitemschanged) and [_viewabilityConfig_](https://reactnative.dev/docs/flatlist#viewabilityconfig) in the FlatList:
```javascript
<FlatList
  contentContainerStyle={styles.alignItemsCenter}
  data={texts}
  horizontal
  keyExtractor={(item) => item.id}
  pagingEnabled
  onViewableItemsChanged={handleVieweableItemsChanged}
  viewabilityConfig={viewabilityConfig}
  showsHorizontalScrollIndicator={false}
  renderItem={({ item }) => (
  <Text style={styles.viewPagerTextStyle}>{item.text}</Text>
)}
  />
```
The prop _onViewableItemsChanged_ is to execute a function each time the visibility of a list's item changes. In our case, each time we change the page, the function _handleVieweableItemsChanged_ is called:
```javascript
const handleVieweableItemsChanged = useCallback(({ viewableItems }) => {
    setActiveDot(viewableItems[0].index);
  }, []);
```
When this function gets executed the active pagination dot changes, that is, when the user is in the first page, the first dot is shown as active and the same happens with the other pages.

The prop _viewabilityConfig_ is used to inform a lot of parameters which are going to influence the prop _onViewableItemsChanged_. For this case, I'm sending the prop  _viewabilityConfig_ an object with an attribute which informs how much of the item must be shown for it to be considered as visible. The name of this attribute is [_itemVisiblePercentThreshold_](https://reactnative.dev/docs/flatlist#viewabilityconfig): 
```javascript
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };
```
Just 50% of the item must be visible to the function _handleVieweableItemsChanged_  be called.

The pagination dots component code is below:
```javascript
    <Dots
     activeDotWidth={6}
     activeDotHeight={6}
     passiveDotHeight={6}
     passiveDotWidth={6}
     length={3}
     activeColor={"#000"}
     active={activeDot}
     />
```
_________________________________________________
Complete code of the app: https://github.com/gabrielsideprojects/awesome-view-pager-flat-list.

I'm open to pull request and suggestions to the code and article. Make yourself confortable :smiley:.

I used [Expo](https://expo.io/) to create the app.

Let's drink a cozy and warm coffee, say hi to me on [Linkedin](https://www.linkedin.com/in/gabrielmenezesdev/) 😃 ☕.


