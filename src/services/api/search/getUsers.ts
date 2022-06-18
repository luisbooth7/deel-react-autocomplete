async function getUsers(): Promise<string[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  return data.map((user: any) => user.name);
}

export default getUsers;