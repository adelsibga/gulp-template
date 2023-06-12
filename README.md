# gulp-template

Gulp assembly for layout and development of something. [Russian](./docs/ru.md)

## Installation

To work with this assembly in a new project, clone the entire contents of the repository
`git clone <this repository>`

Gradually develop at the root of the project by running the `npm i` command, which installs everything depending on `package.json`. After that, you
can use any of the suggested commands (the resulting files go to the `build` folder in the root directory):

`gulp` is a basic command that runs a development build using browser-sync

`gulp <task name>` - команда, выполняющая задачу <task name>

## Folder and file structure

```
├── src/
│   ├── assets                    # Folder for storing assets - json, php, video files, etc.
│   ├── fonts                     # Font storage folder
│   ├── images                    # Folder for storing pictures
│   │   ├── favicon               # favicon storage folder
│   ├── js                        # Scripts
│   │   ├── components            # Folder with component scripts
│   │   └── index.js              # Main script file
│   ├── less                      # Styles (less syntax)
│   ├── sass                      # Styles (sass syntax)
│   ├── scss                      # Styles (scss syntax)
│   │   ├── components            # Folder with component styles
│   │   ├── config                # Folder with configuration files
│   │   │   └── _fonts.scss       # File for connecting fonts
│   │   │   └── _const.scss       # Constant File
│   │   └── index.scss            # Main style file
│   ├── templates                 # Folder for storing templates for twig files
│   │   └── layout.twig           # template file
│   └── index.twig                # main twig file
└── .gitignore                    # The .gitignore file is needed to hide files and folders from the Git version control system
└── gulpfile.js                   # Gulp Settings File
└── package.json                  # File with build settings and installed packages
└── package-lock.json             # The package-lock.json file is used to lock dependencies to a specific version number
└── README.md                     # Build Documentation
```

## Оглавление

1. [npm-скрипты](#npm-скрипты)
2. [Работа с html](#работа-с-html)
3. [Работа с CSS](#работа-с-css)
4. [Работа с JavaScript](#работа-с-javascript)
5. [Работа со шрифтами](#работа-со-шрифтами)
6. [Работа с изображениями](#работа-с-изображениями)
7. [Работа с иными ресурсами](#работа-с-иными-ресурсами)
8. [Типограф](#типограф)
9. [Рекомендуемые плагины VS Code](#рекомендуемые-плагины-для-vs-code)
10. [Локальные сниппеты](#локальные-сниппеты)
11. [Готовые модули](#готовые-модули)

## Оглавление

1. [](#)
2. [Работа с twig](#)
3. [Работа со стилями](#)
4. [Работа с JS](#)
5. [Работа со шрифтами](#)
6. [Работа с изображениями](#)
7. [Работа с иными ресурсами](#)
8. [Заключегие](#Заключение)

## Заключение

Thanks to everyone who uses the assembly! If you notice any error, please send a question with a detailed description of the problem, I'll look at
everything and try to solve it. Thank you!
