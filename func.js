let tetris = document.createElement("div"); //Создаём блок tetris
tetris.classList.add("tetris"); // Присваиваем ему класс tetris

for (let i = 1; i < 181; i++) {   // Заполняем tetris 180 ячейками с классом excel
  let excel = document.createElement("div");
  excel.classList.add("excel");
  tetris.appendChild(excel);	 
}

let main = document.getElementsByClassName("main")[0];
main.appendChild(tetris); // Помещаем tetris в код страницы

let excel = document.getElementsByClassName('excel');
let i = 0;
 
for (let y = 18; y > 0; y--) { // Присваиваем координаты каждой ячейке(точка 1,1 - левый нижний угол)
	for (let x = 1; x < 11; x++) {
		excel[i].setAttribute('posX',x);
		excel[i].setAttribute('posY',y);
		i++;
	}
}

let x=5, y=15;  	//В этой точке создаются фигуры (выше видимой зоны)

let mainArr = [  	// Задаём фигуры 
	// I (прямая)
	[
		[0,1],
		[0,2],
		[0,3],
		// 90*
		[]

	],
	// O (квадрат)
	[
		[1,0],
		[0,1],
		[1,1]
	],
	// L 
	[
		[1,0],
		[0,1],
		[0,2]
	],
	// J
	[
		[1,0],
		[1,1],
		[1,2]
	],
	// T
	[
		[1,0],
		[2,0],
		[1,1]
	],
	// S
	[
		[1,0],
		[1,1],
		[2,1]
	],
	// Z
	[
		[1,0],
		[-1,1],
		[0,1]
	]

]

let currentFigure = 0;
let figureBody = 0;

function create () { //Функция создания фигуры
	function getRandom() { // Случайным образом получаем номер фигуры
		return Math.round(Math.random()*(mainArr.length-1))
	}
	currentFigure = getRandom(); // Текущая фигура

	figureBody = [	// Строим фигуру на поле
		document.querySelector(`[posX = "${x}"][posY = "${y}"]`),
		document.querySelector(`[posX = "${x + mainArr[currentFigure][0][0]}"][posY = "${y + mainArr[currentFigure][0][1]}"]`),
		document.querySelector(`[posX = "${x + mainArr[currentFigure][1][0]}"][posY = "${y + mainArr[currentFigure][1][1]}"]`),
		document.querySelector(`[posX = "${x + mainArr[currentFigure][2][0]}"][posY = "${y + mainArr[currentFigure][2][1]}"]`)
	]


	for (let i = 0; i < figureBody.length; i++) { // Присваиваем класс, закрашивая фигуру
		figureBody[i].classList.add('figure'); 
	}
}

create(); 

function move() { // Функция сдвига фигуры на 1 клетку вниз
	let moveFlag = true;
	let coordinates = [ // Получаем координаты каждой точки фигуры
		[figureBody[0].getAttribute('posX'),figureBody[0].getAttribute('posY')],
		[figureBody[1].getAttribute('posX'),figureBody[1].getAttribute('posY')],
		[figureBody[2].getAttribute('posX'),figureBody[2].getAttribute('posY')],
		[figureBody[3].getAttribute('posX'),figureBody[3].getAttribute('posY')],
	];

	for (let i = 0; i < coordinates.length; i++) { //Проверка возможности сдвига
		// Если фигура в самом низу или любая ближайшая к фигуре снизу точка имеет класс "set"(занята другой фигурой), то сдвиг не выполяется.
		if (coordinates[i][1]==1 || document.querySelector(`[posX ="${coordinates[i][0]}"][posY ="${coordinates[i][1]-1}"]`).classList.contains('set')) {
			moveFlag = false;
			break;
		}
	}

	if (moveFlag) {
		for (let i = 0; i < figureBody.length; i++) {
			figureBody[i].classList.remove('figure');  // Убираем стили у старых точек фигуры
		}
		figureBody = [ //Присваиваем фигуры новые координаты (сдвиг вниз)
			document.querySelector(`[posX ="${coordinates[0][0]}"][posY ="${coordinates[0][1]-1}"]`),
			document.querySelector(`[posX ="${coordinates[1][0]}"][posY ="${coordinates[1][1]-1}"]`),
			document.querySelector(`[posX ="${coordinates[2][0]}"][posY ="${coordinates[2][1]-1}"]`),
			document.querySelector(`[posX ="${coordinates[3][0]}"][posY ="${coordinates[3][1]-1}"]`)
		]
		for (let i = 0; i < figureBody.length; i++) {
			figureBody[i].classList.add('figure'); // Добавляем стили к новой фигуре
		}
	} else {
		for (let i = 0; i < figureBody.length; i++) { // При остановке фигуры меняем ей класс figure на set.
			figureBody[i].classList.remove('figure'); 
			figureBody[i].classList.add('set');
		}

		create(); // Как только фигура остановилась, создается новая
	}
}

let interval = setInterval(() => {move();}, 300); // Стрелочная функция, аналогична: setInterval(move,300);


let flag = true;

window.addEventListener('keydown', function(e) { // Обработчик событий (нажатия на клавиши)

	// Получаем координаты точек фигуры
	let coordinates1 = [figureBody[0].getAttribute('posX'),figureBody[0].getAttribute('posy')];
	let coordinates2 = [figureBody[1].getAttribute('posX'),figureBody[1].getAttribute('posy')];
	let coordinates3 = [figureBody[2].getAttribute('posX'),figureBody[2].getAttribute('posy')];
	let coordinates4 = [figureBody[3].getAttribute('posX'),figureBody[3].getAttribute('posy')];

	function getNewState (a) { // Функция сдвига фигуры в сторону

		flag = true;

		let figureNew = [ // Получаем координаты, В которые сдвинется фигура
			document.querySelector(`[posX ="${+coordinates1[0] + a}"][posY ="${+coordinates1[1]}"]`),
			document.querySelector(`[posX ="${+coordinates2[0] + a}"][posY ="${+coordinates2[1]}"]`),
			document.querySelector(`[posX ="${+coordinates3[0] + a}"][posY ="${+coordinates3[1]}"]`),
			document.querySelector(`[posX ="${+coordinates4[0] + a}"][posY ="${+coordinates4[1]}"]`)
		];

		for (let i = 0; i < figureNew.length; i++) {
			// Если такой точки не существует или она уже занята другой фигурой, то сдвиг не выполняется
			if (!figureNew[i] || figureNew[i].classList.contains('set')) {
				flag = false;
			}
		}

		if (flag == true) {
			for (let i = 0; i < figureBody.length; i++) {
				figureBody[i].classList.remove('figure'); // Убираем стили старых точек
			}	

			figureBody = figureNew;

			for (let i = 0; i < figureBody.length; i++) {
				figureBody[i].classList.add('figure'); // Даем стили новых точек
			}	
		}
	}

	if (e.keyCode == 37) { // Стрелка влево - сдвиг влево
		getNewState(-1);
	} else if (e.keyCode == 39) { // Стрелка вправо - сдвиг вправо
		getNewState (1);
	} else if (e.keyCode == 40) { // Стрелка вниз - сдвиг вниз (ускоряем падение)
		move();
	}

})