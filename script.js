document.addEventListener('DOMContentLoaded', function() {
    // العناصر الرئيسية
    const mainPage = document.getElementById('mainPage');
    const calculatorPage = document.getElementById('calculatorPage');
    const showCalculatorBtn = document.getElementById('showCalculator');
    const backToMainBtn = document.getElementById('backToMain');
    const zakatForm = document.getElementById('zakatForm');
    const resultDiv = document.getElementById('result');

    // أزرار التنقل بين الصفحات
    showCalculatorBtn.addEventListener('click', function() {
        mainPage.classList.add('hidden');
        calculatorPage.classList.remove('hidden');
    });

    backToMainBtn.addEventListener('click', function() {
        calculatorPage.classList.add('hidden');
        mainPage.classList.remove('hidden');
        resultDiv.classList.add('hidden');
        zakatForm.reset();
    });

    // حساب الزكاة
    zakatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // جمع القيم من النموذج
        const cash = parseFloat(document.getElementById('cash').value) || 0;
        const gold = parseFloat(document.getElementById('gold').value) || 0;
        const silver = parseFloat(document.getElementById('silver').value) || 0;
        const trade = parseFloat(document.getElementById('trade').value) || 0;
        const stocks = parseFloat(document.getElementById('stocks').value) || 0;
        const debts = parseFloat(document.getElementById('debts').value) || 0;

        // حساب إجمالي الأموال الزكوية
        const totalAmount = cash + gold + silver + trade + stocks - debts;
        
        // حساب النصاب (نفترض أن النصاب يساوي 85 جرام ذهب بسعر 200 ريال للجرام)
        const nisab = 85 * 200; // 17000 ريال

        // حساب الزكاة إذا بلغ النصاب
        let zakatAmount = 0;
        if (totalAmount >= nisab) {
            zakatAmount = totalAmount * 0.025; // 2.5% من إجمالي المال
        }

        // عرض النتائج
        document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
        document.getElementById('zakatAmount').textContent = zakatAmount.toFixed(2);
        resultDiv.classList.remove('hidden');
    });
});