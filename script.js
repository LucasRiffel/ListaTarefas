const TradeMode = document.getElementById('trade-mode');

TradeMode.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});

function newElement() {
    var li = document.createElement("li");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "myCheckbox";
    li.appendChild(checkbox);

    var label = document.createElement("label");
    label.htmlFor = "myCheckbox";
    li.appendChild(label);

    var inputElement = document.getElementById("myInput");
    var inputValue = inputElement.value;

    if (inputValue.length > 20) {
        alert("O texto da tarefa não pode ter mais de 20 caracteres, ele será limpo.");
        inputElement.value = "";
        return;
    }

    var span = document.createElement("span");
    span.textContent = inputValue;
    li.appendChild(span);

    if (inputValue === '') {
        alert("Você deve escrever algo!");
    } else {
        document.getElementById("myUL").appendChild(li);
        addEditRemoveButtons(li);
        addTimer(li);
    }

    inputElement.value = "";
}



function addEditRemoveButtons(li) {
    var editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.onclick = function () {
        editTask(li);
    };
    li.appendChild(editButton);

    var removeButton = document.createElement("button");
    removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    removeButton.onclick = function () {
        removeTask(li);
    };
    li.appendChild(removeButton);
    editButton.className = "icone-edicao";
    removeButton.className = "icone-excluir";

}


function addTimer(li) {
    var timer = document.createElement("span");
    timer.className = "contador-tarefa";
    timer.textContent = "0:00"
    li.appendChild(timer);

    var seconds = 0;
    var intervalId;

    var checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('click', function () {
        if (!this.checked && intervalId === undefined) {
            intervalId = startTimer();
        }
    });

    function startTimer() {
        return setInterval(function () {
            if (checkbox.checked) {
                clearInterval(intervalId);
                intervalId = undefined;
            } else {
                seconds++;
                timer.textContent = formatTime(seconds);
            }
        }, 1000);
    }

    intervalId = startTimer();
}

function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


function editTask(li) {
    var textNode = li.querySelector("span");
    var newText = prompt("Editar tarefa:", textNode.textContent);

    if (newText !== null && newText !== "") {
        textNode.textContent = newText;
    }
}



function removeTask(li) {
    if (confirm("Tem certeza de que deseja remover esta tarefa?")) {
        li.remove();
    }
}
