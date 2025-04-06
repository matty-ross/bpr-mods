const downloads = [
    {
        name: 'mods',
        version: '1.1.0',
        hash: 'D11440E01B9891EC780C09896304C24DF491CA4837434FE80C6C271ABC85B308',
        deprecated: false,
    },
    {
        name: 'mods',
        version: '1.0.0',
        hash: 'DC34D4B74504AFEC39B808619E4C897282266A660274DD254F2FE3736830D14F',
        deprecated: true,
    },
];


export default [
    {
        id: 'exception-reporter',
        title: 'Exception Reporter',
        description: "Displays a dialog with exception's information when it rises.",
        downloads: downloads,
        images: [
            {
                name: 'dialog.png',
                description: "Dialog that appears when an exception rises.",
            },
        ],
    },
    {
        id: 'free-camera',
        title: 'Free Camera',
        description: "Allows moving the external camera around the city. Plus various camera properties that can be changed.",
        downloads: downloads,
        images: [
            {
                name: 'menu.png',
                description: "Menu with options for the mod.",
            },
            {
                name: 'city-view.png',
                description: "City view with custom camera transformation.",
            },
        ],
    },
    {
        id: 'bully-repellent',
        title: 'Bully Repellent',
        description: "Automatically kicks or mutes a player on the user's blacklist.",
        downloads: downloads,
        images: [
            {
                name: 'menu.png',
                description: "Menu with options for the mod.",
            },
        ],
    },
    {
        id: 'protection',
        title: 'Protection',
        description: "Replaces a new vehicle's or challenge's ID sent over the network to avoid crashing players.",
        downloads: downloads,
        images: [
            {
                name: 'menu.png',
                description: "Menu with options for the mod.",
            },
        ],
    },
    {
        id: 'dashboard',
        title: 'Dashboard',
        description: "Displays vehicle's speed, RPM, gear, and other stuff in the HUD.",
        downloads: downloads,
        images: [],
    },
];
