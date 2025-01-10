export function formatarData(entry:string|Date) {
  const data = new Date(entry);
  let dia = data.getDate().toString().padStart(2, '0');  
  let mes = (data.getMonth() + 1).toString().padStart(2, '0'); 
  let ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}