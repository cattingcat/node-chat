
React.render(
    <Timer start={Date.now()} />,
    document.querySelector('footer .timer')
);

React.render(
    <HistoryLog />,
    document.querySelector('aside')
);

var smiles = {
    ':peka:': 'http://lurkmore.so/images/8/8d/1238521509967.png'
};

var routing = [
    { pattern: /.*theme.*/, component: Theme },
    { pattern: /.*chat.*/,  component: Chat, properties: {smiles: smiles} }
];

var view = document.querySelector('main > article');
RouteModule.init(routing, view);