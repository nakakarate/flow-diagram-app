let currentStage = 0;
let selectedPath = [];

const flowStages = [
    {
        buttons: [
            { id: 'construction', text: '工事中', color: 'bg-purple-400', nextOptions: ['knew', 'didntKnow'] }
        ]
    },
    {
        buttons: [
            { id: 'knew', text: 'このサイトを知っていた', color: 'bg-pink-300', nextOptions: ['pin'] },
            { id: 'didntKnow', text: 'このサイトを知らなかった', color: 'bg-pink-300', nextOptions: ['tryPin'] }
        ]
    },
    {
        buttons: [
            { id: 'pin', text: 'タスクバーにピン止めする', color: 'bg-yellow-200', nextOptions: ['wait'] },
            { id: 'tryPin', text: 'とり合えずタスクバーにピン止めしてみる', color: 'bg-yellow-200', nextOptions: ['wait'] }
        ]
    },
    {
        buttons: [
            { id: 'wait', text: '完成を待つ', color: 'bg-green-300', nextOptions: [] }
        ]
    }
];

const flowContainer = document.getElementById('flow-container');
const backBtn = document.getElementById('back-btn');
const homeBtn = document.getElementById('home-btn');

const renderButtons = () => {
    flowContainer.innerHTML = '';
    const currentButtons = flowStages[currentStage].buttons.filter(button =>
        !selectedPath.length || 
        flowStages[currentStage - 1].buttons.find(btn => btn.id === selectedPath[selectedPath.length - 1])?.nextOptions.includes(button.id)
    );

    currentButtons.forEach(button => {
        const btn = document.createElement('button');
        btn.textContent = button.text;
        btn.className = button.color;
        btn.onclick = () => {
            selectedPath.push(button.id);
            currentStage++;
            renderButtons();
        };
        flowContainer.appendChild(btn);
    });

    backBtn.classList.toggle('hidden', currentStage === 0);
    homeBtn.classList.toggle('hidden', currentStage === 0);
};

backBtn.onclick = () => {
    if (currentStage > 0) {
        selectedPath.pop();
        currentStage--;
        renderButtons();
    }
};

homeBtn.onclick = () => {
    currentStage = 0;
    selectedPath = [];
    renderButtons();
};

renderButtons();
