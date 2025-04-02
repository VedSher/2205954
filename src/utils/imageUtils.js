export const getRandomImage = (type, id) => {
    const seed = `${type}-${id}`;
    const hash = Array.from(seed).reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    
    const randomNum = Math.abs(hash % 1000);
    
    if (type === 'user') {
      return `https://randomuser.me/api/portraits/${randomNum % 2 === 0 ? 'men' : 'women'}/${randomNum % 70 + 1}.jpg`;
    } else {
      return `https://picsum.photos/seed/${seed}/400/300`;
    }
  };