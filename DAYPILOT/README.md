Arborescence du Projet



DayPilot/
│
├── docs/
│   ├── cahier_des_charges/
│   │   └── DayPilot_CDC.docx
│   ├── merise/
│   │   ├── MCD_DayPilot.png
│   │   ├── MLD_DayPilot.png
│   │   ├── MPD_DayPilot.png
│   │   └── Dictionnaire_de_donnees.pdf
│   └── planning/
│       ├── roadmap.md
│       └── gantt.png
│
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/daypilot/app/
│   │   │   │       ├── MainActivity.java
│   │   │   │       ├── adapters/
│   │   │   │       │   └── TaskAdapter.java
│   │   │   │       ├── models/
│   │   │   │       │   └── Task.java
│   │   │   │       ├── database/
│   │   │   │       │   ├── AppDatabase.java
│   │   │   │       │   └── TaskDao.java
│   │   │   │       ├── notifications/
│   │   │   │       │   └── AlarmScheduler.java
│   │   │   │       └── ui/
│   │   │   │           ├── AddTaskActivity.java
│   │   │   │           └── TaskDetailActivity.java
│   │   │   ├── res/
│   │   │   │   ├── layout/
│   │   │   │   │   ├── activity_main.xml
│   │   │   │   │   ├── item_task.xml
│   │   │   │   │   └── activity_add_task.xml
│   │   │   │   ├── values/
│   │   │   │   │   ├── colors.xml
│   │   │   │   │   ├── strings.xml
│   │   │   │   │   └── styles.xml
│   │   │   │   └── drawable/
│   │   │   │       └── background_task.xml
│   │   │   └── AndroidManifest.xml
│   │   └── test/
│   └── build.gradle
│
├── .gitignore
├── README.md
└── LICENSE
