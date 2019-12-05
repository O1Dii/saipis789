window.onload = () => {
    const form = document.getElementById('main-form');
    const input1 = document.getElementsByTagName('input')[0];
    const input2 = document.getElementsByTagName('input')[1];
    const variants = ['bulka', 'loaf', 'bulochka'];
    const percentage = document.getElementById('percentage');
    const result = document.getElementById('result');

    if (variants.includes(input1.value.toLowerCase()) || variants.includes(input2.value.toLowerCase())) {
        const timeout = setTimeout(() => {
            setInterval(() => {
                percentage.innerText = +percentage.innerText + 1;
                if (percentage.innerText > 100) {
                    result.innerText = "It's actually greater then it could have possibly get!";
                }
            }, 200);

            result.innerText = "Oh, wait, i was wrong";
        }, 5000);
    }

    form.addEventListener('submit', e => {
        e.preventDefault();

        history.pushState({}, '', `/?fname=${input1.value}&sname=${input2.value}`);
        window.location.reload();
    });
};