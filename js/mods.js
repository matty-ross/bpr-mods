const downloads = [
    {
        name: 'mods',
        version: '1.0.0',
        hash: '0000000000000000000000000000000000000000000000000000000000000000',
    },
];

const menuToggleHotkey = 'F7';


export default [
    {
        id: 'exception-reporter',
        title: 'Exception Reporter',
        description: "Displays a dialog with exception's information when it rises.",
        notes: [
            "It may not catch every exception.",
            "Don't expect people immediatelly knowing what's wrong by uploading a screenshot of the exception report.",
        ],
        downloads: downloads,
        images: [
            {
                name: 'dialog.png',
                description: "Dialog that appears after an exception rises.",
            },
        ],
        extraContent: false,
    },
    {
        id: 'free-camera',
        title: 'Free Camera',
        description: "Allows moving the external camera around the city. Plus various camera properties that can be changed.",
        notes: [
            `Press ${menuToggleHotkey} to toggle the menu.`,
            "Use your mouse to freely transform the camera.",
        ],
        downloads: downloads,
        images: [
            {
                name: 'menu.png',
                description: "Menu with options for the mod.",
            },
            {
                name: 'city-view.png',
                description: "City view with custom camera transform.",
            },
        ],
        extraContent: false,
    },
    {
        id: 'bully-repellent',
        title: 'Bully Repellent',
        description: "Automatically kicks or mutes a player on the user's blacklist.",
        notes: [
            `Press ${menuToggleHotkey} to toggle the menu.`,
            "Players added to the blacklist aren't automatically kicked or muted, you must check either 'Autokick' or 'Automute'.",
            "You cannot add yourself to the list, nor the same player multiple times.",
        ],
        downloads: downloads,
        images: [
            {
                name: 'menu.png',
                description: "Menu with options for the mod.",
            },
        ],
        extraContent: false,
    },
    {
        id: 'protection',
        title: 'Protection',
        description: "Replaces a new vehicle's or challenge's ID sent over the network to avoid crashing players.",
        notes: [
            `Press ${menuToggleHotkey} to toggle the menu.`,
            "New vehicles and challenges are added to the protection list automatically.",
            "You can set the replacement vehicle/challenge individually, or let it use the fallback vehicle/challenge.",
        ],
        downloads: downloads,
        images: [
            {
                name: 'menu.png',
                description: "Menu with options for the mod.",
            },
        ],
        extraContent: false,
    },
];
