var APP_DATA = {
  "scenes": [
    {
      "id": "0-entre",
      "name": "Entrée du Fort Napoléon",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        },
        {
          "tileSize": 512,
          "size": 4096
        }
      ],
      "faceSize": 2992,
      "image": "img/minimap1.png",
      "initialViewParameters": {
        "yaw": -2.010559167022194,
        "pitch": 0.011328634171023921,
        "fov": 0.7688152265754168
      },
      "linkHotspots": [
        {
          "yaw": -1.9109238646763238,
          "pitch": -0.07329206248098075,
          "rotation": 6.283185307179586,
          "target": "1-place-du-fort"
        }
      ],
      "infoHotspots": [
        {
          "yaw": 1.1399191055675235,
          "pitch": -0.116856877902501,
          "title": "Entrée Principal",
          "text": "À l’époque de sa construction au XIXe siècle, cette entrée servait à contrôler les accès au fort. Elle constituait un point stratégique défensif, protégé par des portes massives et surveillé en permanence. Les troupes, les officiers et les convois de matériel transitaient par ici. Elle permettait aussi une liaison rapide avec l’extérieur en cas d’alerte. <br> Aujourd’hui, elle conserve encore les marques architecturales de sa vocation militaire.<div><br></div>"
        }
      ]
    },
    {
      "id": "1-place-du-fort",
      "name": "Place d’Armes",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        },
        {
          "tileSize": 512,
          "size": 4096
        }
      ],
      "faceSize": 2992,
      "image": "img/minimap2.png",
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -1.3547376890001068,
          "pitch": 0.015973552212003028,
          "rotation": 6.283185307179586,
          "target": "0-entre"
        },
        {
          "yaw": 2.5599383549558894,
          "pitch": -0.020892057106607353,
          "rotation": 0,
          "target": "2-couloir-entr-1"
        },
        {
          "yaw": -2.9321417626422033,
          "pitch": -0.003269811734909922,
          "rotation": 0,
          "target": "3-piece-1"
        }
      ],
      "infoHotspots": [
  {
    "yaw": 1.119,
    "pitch": -0.18,
    "title": "Place d’Armes",
    "text": "La place centrale du fort servait autrefois de lieu de rassemblement pour les troupes. C’est ici que se tenaient les appels, les entraînements, et parfois les cérémonies militaires."
  },
  {
    "yaw": -3,
    "pitch": -0.4,
    "title": "Accès stratégique",
    "text": "Depuis cette zone, les soldats pouvaient accéder rapidement aux différentes casemates et galeries. Cet emplacement offrait une vue dégagée pour surveiller les mouvements internes du fort."
  }
]

    },
    {
      "id": "2-couloir-entr-1",
      "name": "Galerie de communication",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        },
        {
          "tileSize": 512,
          "size": 4096
        }
      ],
      "faceSize": 2992,
      "image": "img/minimap7.png",
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 3.1381337023124374,
          "pitch": -0.002468194954113656,
          "rotation": 0,
          "target": "1-place-du-fort"
        },
        {
          "yaw": -0.030092033683015273,
          "pitch": -0.00376546408068279,
          "rotation": 0,
          "target": "4-piece"
        },
        {
          "yaw": 0.7374656270924937,
          "pitch": 0.07788909711534941,
          "rotation": 7.0685834705770345,
          "target": "6-petite-piece-droite"
        },
        {
          "yaw": -0.9556630872101497,
          "pitch": 0.0725979801651846,
          "rotation": 5.497787143782138,
          "target": "5-petite-piece-gauche"
        }
      ],
      "infoHotspots": [
        {
          "yaw": -0.37,
          "pitch": -0.32,
          "title": "Galerie de communication",
          "text": "Cette galerie permettait aux soldats de se déplacer à l’abri à travers le fort. Elle reliait les différents espaces stratégiques, comme les casemates, les alcôves et la cour intérieure. Sa forme étroite et voûtée assurait une protection contre les tirs et les éclats d’obus. Elle constituait aussi un excellent moyen de circulation rapide en cas d’attaque."
        }
      ]

    },
    {
      "id": "3-piece-1",
      "name": "Casemate intérieure",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        },
        {
          "tileSize": 512,
          "size": 4096
        }
      ],
      "faceSize": 2992,
      "image": "img/minimap3.png",
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.250048439403309,
          "pitch": 0.02059319694928874,
          "rotation": 0,
          "target": "1-place-du-fort"
        }
      ],
      "infoHotspots": [
        {
          "yaw": -2.9,
          "pitch": -0.26,
          "title": "Zone de repos",
          "text": "Cette pièce servait de casemate intérieure, offrant un abri sécurisé pour les soldats entre les périodes de surveillance. Son architecture voûtée permettait de limiter les impacts des explosions extérieures tout en maintenant une température constante. On y retrouvait parfois des lits de camp et du matériel."
        }
      ]
      
    },
    {
      "id": "4-piece",
      "name": "Casemate de tir",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        },
        {
          "tileSize": 512,
          "size": 4096
        }
      ],
      "faceSize": 2992,
      "image": "img/minimap6.png",
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 1.543311745599623,
          "pitch": 0.004749579698051676,
          "rotation": 0,
          "target": "2-couloir-entr-1"
        }
      ],
      "infoHotspots": [
        {
          "yaw": 0.28,
          "pitch": -0.17,
          "title": "Meurtrière de tir",
          "text": "Cette meurtrière permettait aux soldats de tirer tout en restant à l'abri. Elle était orientée vers l’extérieur pour couvrir les approches du fort."
        },
        {
          "yaw": 2.65,
          "pitch": -0.17,
          "title": "Espace de veille en alerte",
          "text": "Lors des périodes de tension ou d'alerte, des soldats restaient en poste ici, prêts à intervenir rapidement en cas d’attaque."
        }
      ]
    },
    {
      "id": "5-petite-piece-gauche",
      "name": "Alcôve de gauche",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        },
        {
          "tileSize": 512,
          "size": 4096
        }
      ],
      "faceSize": 2992,
      "image": "img/minimap4.png",
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": -0.42594122641427745,
          "pitch": 0.006694385278009918,
          "rotation": 0.7853981633974483,
          "target": "2-couloir-entr-1"
        },
        {
          "yaw": 1.7265533966498543,
          "pitch": 0.0063585853873870946,
          "rotation": 5.497787143782138,
          "target": "2-couloir-entr-1"
        }
      ],
      "infoHotspots": [
        {
          "yaw": 0.8,
          "pitch": -0.12,
          "title": "Poste de veille",
          "text": "Cette alcôve abritait un poste de veille ou de repos pour les soldats de garde. Située à proximité des galeries, elle offrait un espace discret mais accessible, idéal pour assurer une surveillance continue des zones sensibles du fort."
        }
      ]      
    },
    {
      "id": "6-petite-piece-droite",
      "name": "Alcôve de droite",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        },
        {
          "tileSize": 512,
          "size": 4096
        }
      ],
      "faceSize": 2992,
      "image": "img/minimap5.png",
      "initialViewParameters": {
        "yaw": -2.499868221302803,
        "pitch": 0.00809371580906948,
        "fov": 1.1120146640513902
      },
      "linkHotspots": [
        {
          "yaw": -1.956643116310989,
          "pitch": 0.03039863123362707,
          "rotation": 5.497787143782138,
          "target": "2-couloir-entr-1"
        },
        {
          "yaw": 2.4961618252309847,
          "pitch": -0.007763093834668666,
          "rotation": 0.7853981633974483,
          "target": "2-couloir-entr-1"
        }
      ],
      "infoHotspots": [
        {
          "yaw": -1.1,
          "pitch": -0.15,
          "title": "Stockage de munitions",
          "text": "Cette alcôve servait d’espace de stockage pour les munitions et le matériel nécessaire à la défense du fort. Sa position protégée permettait de limiter les risques en cas d’explosion ou d’incendie dans les zones voisines."
        }
      ]
    }
  ],
  "name": "Project Title",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": true,
    "viewControlButtons": false
  }
};




