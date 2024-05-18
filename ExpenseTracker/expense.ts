const addTask = document.getElementById("addTask");
const form = document.getElementById("form") as HTMLFormElement;
const submitButton = document.getElementById("submitButton") as HTMLInputElement;
const category = document.getElementById("category") as HTMLInputElement;
const todaydate = document.getElementById("date") as HTMLInputElement;
const amount = document.getElementById("amount") as HTMLInputElement;
const tablebody = document.getElementById("tablebody") as HTMLElement;
const totalPrice = document.getElementById("totalPrice") as HTMLElement;
const editingForm = document.getElementById('editform');

if (totalPrice) {
    totalPrice.style.display = 'none'; // Hide the paragraph
}
interface Items {
    todaydate: string;
    category: string;
    amount: number;
}

addTask?.addEventListener("click", () => {
    if (form) {
        form.style.display = "flex";
    }
});

submitButton?.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission

    const item: Items = {
        todaydate: new Date(todaydate.value).toISOString().split('T')[0],
        category: category.value,
        amount: parseInt(amount.value)
    };
    data.addDetails(item);
    form.style.display = "none";
    form.reset();
});

class ExpenseDetails {
    details: Items[];

    constructor() {
        this.details = [];
    }

    addDetails(detail: Items) {
        this.details.push(detail);
        this.renderTable();
    }

    deleteDetails(index: number) {
        this.details.splice(index, 1);
        this.renderTable();
    }
    getTotal() {
        return this.details.reduce((acc, details) => {
            return acc + details.amount
        }, 0)
    }
    renderTable() {
        tablebody.innerHTML = '';
        this.details.forEach((detail, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${detail.amount}</td>
                <td>${detail.category}</td>
                <td>${detail.todaydate}</td>
                <td>
                    <button onclick="data.editExpense(${index})">Edit</button></td>
                    <td><button onclick="data.deleteDetails(${index})" id="delete">Delete</button>
                </td>
            `;
            tablebody.appendChild(row);
        });
        totalPrice.innerHTML = `&#x20b9;${data.getTotal()}`
        if (totalPrice) {
            totalPrice.style.display = "inline-block"; // Display the paragraph
        }
    }
    editExpense(index: number) {
        const detail = this.details[index];
        if (detail) {
            const editForm = document.createElement('form');
            editForm.setAttribute('id', 'editForm');

            const amountInput = document.createElement('input');
            amountInput.type = 'number';
            amountInput.value = detail.amount.toString();

            const categoryInput = document.createElement('input');
            categoryInput.type = 'text';
            categoryInput.value = detail.category;

            const dateInput = document.createElement('input');
            dateInput.type = 'date';
            dateInput.value = detail.todaydate;

            const submitButton = document.createElement('button');
            submitButton.textContent = 'Save';

            editForm.addEventListener('submit', (event) => {
                event.preventDefault();

                this.details[index] = {
                    amount: parseInt(amountInput.value),
                    category: categoryInput.value,
                    todaydate: dateInput.value
                };

                this.renderTable();

                editForm.remove();
            });

            editForm.appendChild(amountInput);
            editForm.appendChild(categoryInput);
            editForm.appendChild(dateInput);
            editForm.appendChild(submitButton);
            document.body.appendChild(editForm);
        }
    }

}

const data = new ExpenseDetails();
