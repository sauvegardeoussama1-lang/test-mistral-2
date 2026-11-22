// ========================================
// Nexus Games - Data Store
// ========================================

// Categories
const categories = [
    { id: 'action', name: 'Action', count: 125, icon: 'fa-bolt' },
    { id: 'rpg', name: 'RPG', count: 89, icon: 'fa-sword' },
    { id: 'fps', name: 'FPS', count: 72, icon: 'fa-crosshairs' },
    { id: 'adventure', name: 'Aventure', count: 112, icon: 'fa-compass' },
    { id: 'sports', name: 'Sports', count: 56, icon: 'fa-football-ball' },
    { id: 'racing', name: 'Course', count: 42, icon: 'fa-flag-checkered' },
    { id: 'horror', name: 'Horreur', count: 38, icon: 'fa-ghost' },
    { id: 'strategy', name: 'Stratégie', count: 67, icon: 'fa-chess' }
];

// Platforms
const platforms = [
    { id: 'pc', name: 'PC', icon: 'fa-windows', count: 245 },
    { id: 'ps5', name: 'PS5', icon: 'fa-playstation', count: 189 },
    { id: 'xbox', name: 'Xbox Series X/S', icon: 'fa-xbox', count: 167 },
    { id: 'nintendo', name: 'Nintendo Switch', icon: 'fa-nintendo-switch', count: 134 }
];

// Sample Games Data
const games = [
    {
        id: 1,
        title: 'Cyberpunk 2077: Phantom Liberty',
        description: 'Plongez dans Night City comme jamais auparavant avec cette extension révolutionnaire qui ajoute de nouvelles missions, personnages et zones à explorer.',
        price: 59.99,
        oldPrice: 79.99,
        category: ['action', 'rpg'],
        platform: ['pc', 'ps5', 'xbox'],
        developer: 'CD Projekt Red',
        publisher: 'CD Projekt',
        releaseDate: '2024-06-21',
        rating: 4.8,
        reviewCount: 128,
        isNew: true,
        isOnSale: true,
        discount: 25,
        image: 'https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Cyberpunk+2077',
        images: [
            'https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Cyberpunk+2077+1',
            'https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Cyberpunk+2077+2',
            'https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Cyberpunk+2077+3',
            'https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Cyberpunk+2077+4'
        ],
        features: [
            'Monde ouvert expansif',
            'Graphismes 4K Ultra HD',
            'Nouveaux personnages et missions',
            'Système de combat amélioré',
            'Contenu téléchargeable inclus'
        ],
        story: 'Dans un futur dystopique, incarnez V, un mercenaire en quête de gloire et de fortune dans Night City, une métropole obsédée par le pouvoir, le luxe et les modifications corporelles.',
        gameplay: 'Découvrez un système de combat dynamique, des puzzles complexes et un monde ouvert rempli de secrets à découvrir.',
        systemRequirements: {
            windows: {
                min: {
                    os: 'Windows 10 (64-bit)',
                    processor: 'Intel Core i5-3470 / AMD FX-8350',
                    memory: '8 GB RAM',
                    graphics: 'NVIDIA GeForce GTX 970 / AMD Radeon RX 470',
                    storage: '50 GB'
                },
                recommended: {
                    os: 'Windows 11 (64-bit)',
                    processor: 'Intel Core i7-7700K / AMD Ryzen 5 3600',
                    memory: '16 GB RAM',
                    graphics: 'NVIDIA GeForce RTX 2060 / AMD Radeon RX 5700',
                    storage: '50 GB SSD'
                }
            },
            ps5: {
                console: 'PlayStation 5',
                storage: '60 GB minimum',
                features: ['DualSense', '3D Audio', '4K/120Hz']
            },
            xbox: {
                console: 'Xbox Series X|S',
                storage: '55 GB minimum',
                features: ['Quick Resume', 'Smart Delivery']
            }
        },
        reviews: [
            {
                id: 1,
                user: 'Jean D.',
                rating: 5,
                date: '2024-07-15',
                comment: 'Incroyable ! Les améliorations par rapport au jeu original sont impressionnantes. Graphismes époustouflants et histoire captivante.'
            },
            {
                id: 2,
                user: 'Marie L.',
                rating: 5,
                date: '2024-07-10',
                comment: 'Un chef-d\'œuvre absolu. J\'ai adoré chaque instant passé dans Night City.'
            },
            {
                id: 3,
                user: 'Pierre M.',
                rating: 4,
                date: '2024-07-05',
                comment: 'Très bon jeu, mais un peu court. J\'aurais aimé plus de contenu.'
            }
        ]
    },
    {
        id: 2,
        title: 'Elden Ring: Shadow of the Erdtree',
        description: 'Explorez les Terres Intermédiaires comme jamais auparavant avec cette extension massive qui ajoute de nouveaux boss, donjons et mécaniques de jeu.',
        price: 39.99,
        oldPrice: 49.99,
        category: ['rpg', 'action'],
        platform: ['pc', 'ps5', 'xbox'],
        developer: 'FromSoftware',
        publisher: 'Bandai Namco',
        releaseDate: '2024-06-21',
        rating: 4.9,
        reviewCount: 245,
        isNew: true,
        isOnSale: true,
        discount: 20,
        image: 'https://via.placeholder.com/600x400/0a0a0f/ffffff?text=Elden+Ring',
        images: [
            'https://via.placeholder.com/600x400/0a0a0f/ffffff?text=Elden+Ring+1',
            'https://via.placeholder.com/600x400/0a0a0f/ffffff?text=Elden+Ring+2',
            'https://via.placeholder.com/600x400/0a0a0f/ffffff?text=Elden+Ring+3'
        ],
        features: [
            'Nouveaux boss épiques',
            'Zones inédites à explorer',
            'Nouveaux sorts et compétences',
            'Armes et armures légendaires',
            'Multijoueur coopératif'
        ],
        story: 'Plongez dans un monde sombre et mystérieux où chaque décision peut signifier la vie ou la mort.',
        gameplay: 'Combat stratégique, exploration minutieuse et adaptation constante sont les clés de la survie.',
        systemRequirements: {
            windows: {
                min: {
                    os: 'Windows 10 (64-bit)',
                    processor: 'Intel Core i5-8400 / AMD Ryzen 3 3300X',
                    memory: '12 GB RAM',
                    graphics: 'NVIDIA GeForce GTX 1060 / AMD Radeon RX 580',
                    storage: '60 GB'
                },
                recommended: {
                    os: 'Windows 11 (64-bit)',
                    processor: 'Intel Core i7-8700K / AMD Ryzen 5 3600X',
                    memory: '16 GB RAM',
                    graphics: 'NVIDIA GeForce RTX 2060 / AMD Radeon RX 5700 XT',
                    storage: '60 GB SSD'
                }
            }
        }
    },
    {
        id: 3,
        title: 'Starfield',
        description: 'Embarquez pour un voyage interstellaire sans précédent dans ce RPG spatial épique de Bethesda.',
        price: 69.99,
        oldPrice: null,
        category: ['rpg', 'adventure'],
        platform: ['pc', 'xbox'],
        developer: 'Bethesda Game Studios',
        publisher: 'Bethesda Softworks',
        releaseDate: '2023-09-06',
        rating: 4.6,
        reviewCount: 521,
        isNew: false,
        isOnSale: false,
        discount: 0,
        image: 'https://via.placeholder.com/600x400/0f172a/ffffff?text=Starfield',
        images: [
            'https://via.placeholder.com/600x400/0f172a/ffffff?text=Starfield+1',
            'https://via.placeholder.com/600x400/0f172a/ffffff?text=Starfield+2',
            'https://via.placeholder.com/600x400/0f172a/ffffff?text=Starfield+3'
        ],
        features: [
            'Univers ouvert avec plus de 1000 planètes',
            'Création de personnage approfondie',
            'Construction de vaisseaux spatiaux',
            'Combats spatiaux en temps réel',
            'Exploration et colonisation'
        ],
        story: 'Dans un futur lointain, l\'humanité a colonisé la galaxie. Vous incarnez un membre de Constellation, une organisation qui explore les mystères de l\'espace.',
        gameplay: 'Explorez, combattez, négociez et construisez votre propre destin parmi les étoiles.',
        systemRequirements: {
            windows: {
                min: {
                    os: 'Windows 10 (64-bit)',
                    processor: 'Intel Core i5-8600K / AMD Ryzen 5 2600X',
                    memory: '16 GB RAM',
                    graphics: 'NVIDIA GeForce GTX 1070 Ti / AMD Radeon RX 5700',
                    storage: '125 GB'
                },
                recommended: {
                    os: 'Windows 11 (64-bit)',
                    processor: 'Intel Core i7-10700K / AMD Ryzen 7 3800XT',
                    memory: '32 GB RAM',
                    graphics: 'NVIDIA GeForce RTX 2080 Ti / AMD Radeon RX 6800 XT',
                    storage: '125 GB SSD'
                }
            }
        }
    },
    {
        id: 4,
        title: 'Hogwarts Legacy',
        description: 'Découvrez Poudlard comme jamais auparavant dans ce RPG ouvert où vous incarnez un étudiant de la célèbre école de magie.',
        price: 49.99,
        oldPrice: 59.99,
        category: ['rpg', 'adventure'],
        platform: ['pc', 'ps5', 'xbox', 'nintendo'],
        developer: 'Avalanche Software',
        publisher: 'Warner Bros. Games',
        releaseDate: '2023-02-10',
        rating: 4.7,
        reviewCount: 387,
        isNew: false,
        isOnSale: true,
        discount: 17,
        image: 'https://via.placeholder.com/600x400/1e293b/ffffff?text=Hogwarts+Legacy',
        images: [
            'https://via.placeholder.com/600x400/1e293b/ffffff?text=Hogwarts+Legacy+1',
            'https://via.placeholder.com/600x400/1e293b/ffffff?text=Hogwarts+Legacy+2',
            'https://via.placeholder.com/600x400/1e293b/ffffff?text=Hogwarts+Legacy+3'
        ],
        features: [
            'Monde ouvert magique',
            'Apprentissage de sorts et potions',
            'Choix de maison (Gryffondor, Serdaigle, Poufsouffle, Serpentard)',
            'Création de potions et culture de plantes',
            'Combats contre des créatures magiques'
        ],
        story: 'Vous recevez une lettre vous informant que vous êtes admis à Poudlard. Découvrez les mystères de l\'école et forgez votre propre destin.',
        gameplay: 'Explorez Poudlard et ses environs, apprenez des sorts, faites des rencontres et affrontez des défis magiques.',
        systemRequirements: {
            windows: {
                min: {
                    os: 'Windows 10 (64-bit)',
                    processor: 'Intel Core i5-8400 / AMD Ryzen 5 1500X',
                    memory: '8 GB RAM',
                    graphics: 'NVIDIA GeForce GTX 960 / AMD Radeon RX 470',
                    storage: '85 GB'
                },
                recommended: {
                    os: 'Windows 11 (64-bit)',
                    processor: 'Intel Core i7-8700K / AMD Ryzen 5 3600X',
                    memory: '16 GB RAM',
                    graphics: 'NVIDIA GeForce GTX 1080 Ti / AMD Radeon RX 5700 XT',
                    storage: '85 GB SSD'
                }
            }
        }
    },
    {
        id: 5,
        title: 'Call of Duty: Modern Warfare III',
        description: 'Retournez sur le champ de bataille avec le dernier opus de la série Call of Duty, offrant une campagne intense et un multijoueur compétitif.',
        price: 69.99,
        oldPrice: null,
        category: ['fps', 'action'],
        platform: ['pc', 'ps5', 'xbox'],
        developer: 'Sledgehammer Games',
        publisher: 'Activision',
        releaseDate: '2023-11-10',
        rating: 4.4,
        reviewCount: 842,
        isNew: false,
        isOnSale: false,
        discount: 0,
        image: 'https://via.placeholder.com/600x400/020617/ffffff?text=Call+of+Duty',
        images: [
            'https://via.placeholder.com/600x400/020617/ffffff?text=Call+of+Duty+1',
            'https://via.placeholder.com/600x400/020617/ffffff?text=Call+of+Duty+2'
        ],
        features: [
            'Campagne solo intense',
            'Multijoueur compétitif',
            'Mode Zombies coopératif',
            'Graphismes de nouvelle génération',
            'Nouvelles cartes et modes de jeu'
        ],
        story: 'Plongez dans une histoire captivante où les enjeux sont plus élevés que jamais.',
        gameplay: 'Combats rapides, tactiques d\'équipe et action intense sont au rendez-vous.',
        systemRequirements: {
            windows: {
                min: {
                    os: 'Windows 10 (64-bit)',
                    processor: 'Intel Core i5-2500K / AMD FX-6300',
                    memory: '8 GB RAM',
                    graphics: 'NVIDIA GeForce GTX 960 / AMD Radeon R9 380',
                    storage: '175 GB'
                },
                recommended: {
                    os: 'Windows 11 (64-bit)',
                    processor: 'Intel Core i7-4770K / AMD Ryzen 5 1500X',
                    memory: '16 GB RAM',
                    graphics: 'NVIDIA GeForce GTX 1660 / AMD Radeon RX 580',
                    storage: '175 GB SSD'
                }
            }
        }
    },
    {
        id: 6,
        title: 'Final Fantasy XVI',
        description: 'Découvrez le dernier opus de la célèbre série Final Fantasy avec des combats en temps réel et une histoire épique.',
        price: 59.99,
        oldPrice: 69.99,
        category: ['rpg'],
        platform: ['ps5'],
        developer: 'Square Enix',
        publisher: 'Square Enix',
        releaseDate: '2023-06-22',
        rating: 4.8,
        reviewCount: 412,
        isNew: false,
        isOnSale: true,
        discount: 14,
        image: 'https://via.placeholder.com/600x400/0f172a/ffffff?text=Final+Fantasy+XVI',
        images: [
            'https://via.placeholder.com/600x400/0f172a/ffffff?text=Final+Fantasy+XVI+1',
            'https://via.placeholder.com/600x400/0f172a/ffffff?text=Final+Fantasy+XVI+2'
        ],
        features: [
            'Combats en temps réel',
            'Histoire épique',
            'Graphismes cinématiques',
            'Bande-son orchestrale',
            'Système de magie unique'
        ],
        story: 'Dans un monde déchiré par la guerre, suivez le destin de Clive Rosfield dans sa quête pour venger son royaume.',
        gameplay: 'Combats dynamiques, exploration de vastes environnements et rencontres avec des personnages mémorables.',
        systemRequirements: {
            ps5: {
                console: 'PlayStation 5',
                storage: '110 GB minimum',
                features: ['DualSense', '3D Audio', '4K/60Hz']
            }
        }
    },
    {
        id: 7,
        title: 'The Legend of Zelda: Tears of the Kingdom',
        description: 'Retournez à Hyrule dans cette suite tant attendue de Breath of the Wild, avec de nouvelles capacités et un monde encore plus vaste.',
        price: 59.99,
        oldPrice: null,
        category: ['adventure', 'action'],
        platform: ['nintendo'],
        developer: 'Nintendo',
        publisher: 'Nintendo',
        releaseDate: '2023-05-12',
        rating: 4.9,
        reviewCount: 678,
        isNew: false,
        isOnSale: false,
        discount: 0,
        image: 'https://via.placeholder.com/600x400/0a0a0f/ffffff?text=Zelda+TOTK',
        images: [
            'https://via.placeholder.com/600x400/0a0a0f/ffffff?text=Zelda+TOTK+1',
            'https://via.placeholder.com/600x400/0a0a0f/ffffff?text=Zelda+TOTK+2'
        ],
        features: [
            'Monde ouvert immense',
            'Nouveaux pouvoirs Ultrahand et Fuse',
            'Vols libres avec les véhicules',
            'Donjons complexes',
            'Nouvelles mécaniques de gameplay'
        ],
        story: 'Link et Zelda explorent les mystères des larmes du royaume et cherchent à sauver Hyrule d\'une nouvelle menace.',
        gameplay: 'Exploration libre, résolution de puzzles et combats créatifs sont au cœur de l\'expérience.',
        systemRequirements: {
            nintendo: {
                console: 'Nintendo Switch',
                storage: '21 GB minimum'
            }
        }
    },
    {
        id: 8,
        title: 'Baldur\'s Gate 3',
        description: 'Le jeu de rôle le plus acclamé de l\'année, offrant une liberté de choix sans précédent et une narration profonde.',
        price: 59.99,
        oldPrice: null,
        category: ['rpg'],
        platform: ['pc', 'ps5', 'xbox'],
        developer: 'Larian Studios',
        publisher: 'Larian Studios',
        releaseDate: '2023-08-03',
        rating: 4.9,
        reviewCount: 987,
        isNew: false,
        isOnSale: false,
        discount: 0,
        image: 'https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Baldurs+Gate+3',
        images: [
            'https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Baldurs+Gate+3+1',
            'https://via.placeholder.com/600x400/1a1a2e/ffffff?text=Baldurs+Gate+3+2'
        ],
        features: [
            'Choix narratifs profonds',
            'Combats tactiques au tour par tour',
            'Création de personnage flexible',
            'Multijoueur coopératif jusqu\'à 4 joueurs',
            'Monde réactif à vos décisions'
        ],
        story: 'Incarnez un personnage capturé par des parasites cérébraux et embarquez dans une quête pour sauver les Royaumes Oubliés.',
        gameplay: 'Explorez, combattez, dialoguez et façonnez votre propre histoire dans un monde riche et détaillé.',
        systemRequirements: {
            windows: {
                min: {
                    os: 'Windows 10 (64-bit)',
                    processor: 'Intel i5-4160 / AMD FX 8120',
                    memory: '8 GB RAM',
                    graphics: 'NVIDIA GeForce GTX 960 / AMD Radeon R9 280X',
                    storage: '120 GB'
                },
                recommended: {
                    os: 'Windows 11 (64-bit)',
                    processor: 'Intel i7-8700K / AMD Ryzen 5 3600',
                    memory: '16 GB RAM',
                    graphics: 'NVIDIA GeForce RTX 2060 / AMD Radeon RX 5700 XT',
                    storage: '120 GB SSD'
                }
            }
        }
    },
    {
        id: 9,
        title: 'Resident Evil 4 Remake',
        description: 'Le remake complet du classique Resident Evil 4, avec des graphismes modernes et un gameplay amélioré.',
        price: 39.99,
        oldPrice: 59.99,
        category: ['horror', 'action'],
        platform: ['pc', 'ps5', 'xbox'],
        developer: 'Capcom',
        publisher: 'Capcom',
        releaseDate: '2023-03-24',
        rating: 4.8,
        reviewCount: 543,
        isNew: false,
        isOnSale: true,
        discount: 33,
        image: 'https://via.placeholder.com/600x400/020617/ffffff?text=Resident+Evil+4',
        images: [
            'https://via.placeholder.com/600x400/020617/ffffff?text=Resident+Evil+4+1',
            'https://via.placeholder.com/600x400/020617/ffffff?text=Resident+Evil+4+2'
        ],
        features: [
            'Graphismes next-gen',
            'Gameplay modernisé',
            'Histoire réimaginée',
            'Nouveaux contenus',
            'Système de combat amélioré'
        ],
        story: 'Leon S. Kennedy est envoyé dans un village isolé en Espagne pour sauver la fille du président des États-Unis.',
        gameplay: 'Survie, gestion des ressources et combats tactiques contre des créatures horrifiques.',
        systemRequirements: {
            windows: {
                min: {
                    os: 'Windows 10 (64-bit)',
                    processor: 'Intel Core i5-7500 / AMD Ryzen 3 1200',
                    memory: '8 GB RAM',
                    graphics: 'NVIDIA GeForce GTX 1050 Ti / AMD Radeon RX 560',
                    storage: '50 GB'
                },
                recommended: {
                    os: 'Windows 11 (64-bit)',
                    processor: 'Intel Core i7-8700 / AMD Ryzen 5 3600',
                    memory: '16 GB RAM',
                    graphics: 'NVIDIA GeForce RTX 2060 / AMD Radeon RX 5700',
                    storage: '50 GB SSD'
                }
            }
        }
    },
    {
        id: 10,
        title: 'Grand Theft Auto VI',
        description: 'Le retour de la série GTA avec un monde ouvert encore plus vaste et des possibilités infinies.',
        price: 79.99,
        oldPrice: null,
        category: ['action', 'adventure'],
        platform: ['ps5', 'xbox'],
        developer: 'Rockstar Games',
        publisher: 'Rockstar Games',
        releaseDate: '2025-01-01',
        rating: 0,
        reviewCount: 0,
        isNew: true,
        isOnSale: false,
        discount: 0,
        image: 'https://via.placeholder.com/600x400/0a0a0f/ffffff?text=GTA+6',
        images: [
            'https://via.placeholder.com/600x400/0a0a0f/ffffff?text=GTA+6+1',
            'https://via.placeholder.com/600x400/0a0a0f/ffffff?text=GTA+6+2'
        ],
        features: [
            'Monde ouvert immense',
            'Nouvelle histoire captivante',
            'Graphismes ultra-réalistes',
            'Multijoueur en ligne',
            'Nouvelles mécaniques de gameplay'
        ],
        story: 'Découvrez une nouvelle histoire dans l\'univers de GTA, avec des personnages mémorables et des intrigues complexes.',
        gameplay: 'Liberté totale dans un monde ouvert où vous pouvez faire ce que vous voulez.',
        systemRequirements: {
            ps5: {
                console: 'PlayStation 5',
                storage: '120 GB minimum',
                features: ['DualSense', '3D Audio', '4K/60Hz']
            },
            xbox: {
                console: 'Xbox Series X|S',
                storage: '110 GB minimum',
                features: ['Quick Resume', 'Smart Delivery']
            }
        }
    },
    {
        id: 11,
        title: 'Assassin\'s Creed Valhalla',
        description: 'Incarnez Eivor, un Viking, dans une aventure épique à travers l\'Angleterre du IXe siècle.',
        price: 29.99,
        oldPrice: 59.99,
        category: ['action', 'rpg'],
        platform: ['pc', 'ps5', 'xbox', 'nintendo'],
        developer: 'Ubisoft Montreal',
        publisher: 'Ubisoft',
        releaseDate: '2020-11-10',
        rating: 4.5,
        reviewCount: 1245,
        isNew: false,
        isOnSale: true,
        discount: 50,
        image: 'https://via.placeholder.com/600x400/1e293b/ffffff?text=AC+Valhalla',
        images: [
            'https://via.placeholder.com/600x400/1e293b/ffffff?text=AC+Valhalla+1',
            'https://via.placeholder.com/600x400/1e293b/ffffff?text=AC+Valhalla+2'
        ],
        features: [
            'Monde ouvert immense',
            'Combats brutaux',
            'Construction de colonie',
            'Raids Vikings',
            'Système de progression approfondi'
        ],
        story: 'Eivor mène son clan de la Norvège à l\'Angleterre dans une quête de gloire et de survie.',
        gameplay: 'Exploration, combats, raids et gestion de colonie sont au cœur de l\'expérience.',
        systemRequirements: {
            windows: {
                min: {
                    os: 'Windows 10 (64-bit)',
                    processor: 'Intel Core i5-2400 / AMD FX-6350',
                    memory: '8 GB RAM',
                    graphics: 'NVIDIA GeForce GTX 960 / AMD Radeon R9 280X',
                    storage: '110 GB'
                },
                recommended: {
                    os: 'Windows 11 (64-bit)',
                    processor: 'Intel Core i7-4790 / AMD Ryzen 5 1600',
                    memory: '16 GB RAM',
                    graphics: 'NVIDIA GeForce GTX 1080 / AMD Radeon RX 5700',
                    storage: '110 GB SSD'
                }
            }
        }
    },
    {
        id: 12,
        title: 'FIFA 24',
        description: 'Le dernier opus de la série FIFA avec des graphismes améliorés et de nouvelles fonctionnalités.',
        price: 69.99,
        oldPrice: null,
        category: ['sports'],
        platform: ['pc', 'ps5', 'xbox', 'nintendo'],
        developer: 'EA Sports',
        publisher: 'Electronic Arts',
        releaseDate: '2023-09-29',
        rating: 4.3,
        reviewCount: 721,
        isNew: false,
        isOnSale: false,
        discount: 0,
        image: 'https://via.placeholder.com/600x400/020617/ffffff?text=FIFA+24',
        images: [
            'https://via.placeholder.com/600x400/020617/ffffff?text=FIFA+24+1',
            'https://via.placeholder.com/600x400/020617/ffffff?text=FIFA+24+2'
        ],
        features: [
            'Graphismes améliorés',
            'Nouveaux modes de jeu',
            'FIFA Ultimate Team',
            'Carrière manager',
            'Multijoueur en ligne'
        ],
        story: 'Vivez la passion du football avec des équipes et des joueurs du monde entier.',
        gameplay: 'Matchs de football réalistes avec des contrôles intuitifs et des stratégies tactiques.',
        systemRequirements: {
            windows: {
                min: {
                    os: 'Windows 10 (64-bit)',
                    processor: 'Intel Core i3-6100U / AMD Athlon X4 880K',
                    memory: '8 GB RAM',
                    graphics: 'NVIDIA GeForce GTX 660 / AMD Radeon HD 7850',
                    storage: '100 GB'
                },
                recommended: {
                    os: 'Windows 11 (64-bit)',
                    processor: 'Intel Core i5-6600K / AMD Ryzen 5 1600',
                    memory: '16 GB RAM',
                    graphics: 'NVIDIA GeForce GTX 1060 / AMD Radeon RX 480',
                    storage: '100 GB SSD'
                }
            }
        }
    }
];

// Featured Games
const featuredGames = [
    games[0], // Cyberpunk 2077
    games[1], // Elden Ring
    games[2], // Starfield
    games[3], // Hogwarts Legacy
    games[7], // Baldur's Gate 3
    games[9]  // GTA 6
];

// New Releases
const newReleases = [
    games[0], // Cyberpunk 2077: Phantom Liberty
    games[1], // Elden Ring: Shadow of the Erdtree
    games[9], // GTA 6
    games[2]  // Starfield
];

// Top Sellers
const topSellers = [
    { game: games[7], rank: 1, sales: 2458 },
    { game: games[0], rank: 2, sales: 2134 },
    { game: games[2], rank: 3, sales: 1987 },
    { game: games[1], rank: 4, sales: 1845 },
    { game: games[3], rank: 5, sales: 1654 }
];

// Cart
let cart = [];

// Wishlist
let wishlist = [];

// User
const user = {
    isLoggedIn: false,
    name: 'Invité',
    email: '',
    favorites: wishlist
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        categories,
        platforms,
        games,
        featuredGames,
        newReleases,
        topSellers,
        cart,
        wishlist,
        user
    };
}
