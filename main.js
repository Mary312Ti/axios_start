const books = [
	{
		name: "Bluth",
		books: ["War", "Peace"],
	},
	{
		name: "Holt",
		books: ["Foo", "Bar"],
	},
];

async function getUsers() {
	await axios
		.get("https://reqres.in/api/users")
		.then((response) => {
			const users = response.data.data;
			const newUser = {};
			newUser.first_name = sessionStorage.getItem("firstName");
			newUser.last_name = sessionStorage.getItem("lastName");
			newUser.email = sessionStorage.getItem("email");
			newUser.avatar = sessionStorage.getItem("avatar");
			users.push(newUser);
			const divR = document.createElement("div");
			divR.id = "divR";
			document.body.append(divR);
			const ulUser = document.createElement("ul");
			divR.append(ulUser);
			const h2 = document.createElement("h2");
			h2.innerHTML = "Already joined";
			ulUser.before(h2);

			users.forEach((user) => {
				const liUser = document.createElement("li");
				ulUser.append(liUser);
				liUser.id = "liUser";
				const firstP = document.createElement("p");
				firstP.id = "firstP";
				firstP.innerHTML = user.first_name + " " + user.last_name;
				liUser.prepend(firstP);
				const img = document.createElement("img");
				img.setAttribute("src", user.avatar);
				liUser.append(img);
				const lastP = document.createElement("p");
				lastP.innerHTML = user.email;
				liUser.append(lastP);
				const bookUl = document.createElement("ul");
				bookUl.id = "bookUl";
				liUser.append(bookUl);
				const bookLi = document.createElement("li");
				bookUl.append(bookLi);
				bookLi.id = "bookLi";

				function addBooks(users) {
					users.forEach((u) => {
						const userBooks = books.find((ub) => ub.name == u.last_name);
						if (userBooks) {
							u.books = userBooks;
						}
					});
				}
				addBooks(users);
				if (user.books != undefined) {
					const bookItem = (innerHTML = user.books.books);
					bookLi.append("Books:" + " " + bookItem);
					// console.log(user.books);
				}
			});

			console.log(`GET users`, users);
		})

		.catch((error) => console.error(error));
}
getUsers();

// ===form===
const formJoin = document.querySelector(".form-join");
const signInBtn = document.querySelector(".signin-btn");
const signUpBtn = document.querySelector(".signup-btn");
const formBox = document.querySelector(".form-box");

signUpBtn.addEventListener("click", function () {
	formBox.classList.add("active");
});

signInBtn.addEventListener("click", function () {
	formBox.classList.remove("active");
});

// ===end form===
formJoin.addEventListener("submit", async (event) => {
	event.preventDefault();
	const firstName = document.querySelector("#first_name").value;
	const lastName = document.querySelector("#last_name").value;
	const email = document.querySelector("#email_join").value;
	const avatar = document.querySelector("#file").files[0].name;
	const user = {
		firstName,
		lastName,
		email,
		avatar,
	};
	const formWrap = document.querySelector(".forms-wrapper");
	formWrap.style.display = "none";
	const divAddedUser = document.createElement("div");
	divAddedUser.id = "divAddedU";
	document.body.prepend(divAddedUser);
	const ulUser = document.createElement("ul");
	ulUser.id = "ulNewUser";
	divAddedUser.append(ulUser);
	const liUser = document.createElement("li");
	liUser.id = "liNewUser";
	const h2 = document.createElement("h2");
	h2.innerHTML = "Hello" + " " + firstName;
	ulUser.before(h2);
	ulUser.append(liUser);
	const userFName = document.createElement("p");
	userFName.id = "userFName";
	liUser.append(userFName);
	userFName.innerHTML = "First name:" + "  " + user.firstName;
	const userLName = document.createElement("p");
	userLName.id = "userLName";
	liUser.append(userLName);
	userLName.innerHTML = "Last name:" + "  " + user.lastName;
	const userEmail = document.createElement("p");
	userEmail.id = "userEmail";
	liUser.append(userEmail);
	userEmail.innerHTML = "Email:" + "  " + user.email;
	addedUser(user);

	async function addedUser(x) {
		await axios
			.post("https://reqres.in/api/users", user)
			.then((response) => {
				const addedUser = response.data;
				console.log(`POST: user is added`, addedUser);
				// appendToDOM([addedUser]);

				sessionStorage.firstName = x.firstName;
				sessionStorage.lastName = x.lastName;
				sessionStorage.email = x.email;
				sessionStorage.avatar = x.avatar;
				location.reload();
				// if (sessionStorage.length != 0) {
				// 	firstName.value = sessionStorage.firstName;
				// 	lastName.value = sessionStorage.lastName;
				// 	email.value = sessionStorage.email;
				// 	avatar.value = sessionStorage.avatar;
				// }
			})
			.catch((error) => console.error(error));
	}
});

//=======
