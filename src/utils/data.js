export const dataUser = [
    {
        id: 1,
        name: "Phạm Đình Phong",
        email: "dinhphong@gmail.com",
        sex: "male",
        position: "Lead",
        status: "active",
    },
    {
        id: 2,
        name: "test",
        email: "dinhphong@gmail.com",
        sex: "female",
        position: "Lead",
        status: "inactive",
    },
    {
        id: 3,
        name: "OKKKK",
        email: "OKKKK@gmail.com",
        sex: "female",
        position: "Lead",
        status: "active",
    },
    {
        id: 4,
        name: "supreme",
        email: "supreme@gmail.com",
        sex: "male",
        position: "Lead",
        status: "inactive",
    },
]

// Random color
const getRandomColor = () => {
    const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    return color;
};

export const noteData = [
    {
        id: Math.floor(Math.random() * 10),
        notes:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        required: true,
        date: new Date(),
        color: getRandomColor(),
    },
    {
        id: Math.floor(Math.random() * 10),
        notes:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        required: true,
        date: new Date(),
        color: getRandomColor(),
    },
]


export const listAll = [
    {
        id: 1,
        name: "Phạm Đình Phong",
        email: "phamdinhphong12@gmail.com",
        phone: "0343061257",
        type: "STUDENT",
        checked: false,
        img: "https://cdn.vuetifyjs.com/images/john.jpg"
    },
    {
        id: 2,
        name: "Demo User",
        email: "Demo339@gmail.com",
        phone: "0343061257",
        type: "STUDENT",
        checked: false,
        img: "https://cdn.vuetifyjs.com/images/john.jpg"

    },
    {
        id: 3,
        name: "Test",
        email: "testUser123@gmail.com",
        phone: "0343061257",
        type: "PARENT",
        checked: false,
        img: "https://cdn.vuetifyjs.com/images/john.jpg"

    },
    {
        id: 4,
        name: "Father",
        email: "yourFather310@gmail.com",
        phone: "0978048261",
        type: "PARENT",
        checked: false,
        img: "https://cdn.vuetifyjs.com/images/john.jpg"
    },
    {
        id: 5,
        name: "Mother",
        email: "Mother123@gmail.com",
        phone: "0978048261",
        type: "PARENT",
        checked: false,
        img: "https://cdn.vuetifyjs.com/images/john.jpg"
    },
    {
        id: 6,
        name: "Luffy",
        email: "Luffy310@gmail.com",
        phone: "0978048261",
        type: "STUDENT",
        checked: false,
        img: "https://cdn.vuetifyjs.com/images/john.jpg"
    },
    {
        id: 7,
        name: "Usop",
        email: "Usop223@gmail.com",
        phone: "0978048261",
        type: "STUDENT",
        checked: false,
        img: "https://cdn.vuetifyjs.com/images/john.jpg"
    },
]

