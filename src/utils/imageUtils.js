export const getRandomImage = (type, id) => {
    // Generate deterministic seed based on type and ID to get consistent images
    // for the same user/post across renders
    const seed = `${type}-${id}`;
    const hash = Array.from(seed).reduce((acc, char) => {
      return ((acc << 5) - acc) + char.charCodeAt(0);
    }, 0);
    
    const randomNum = Math.abs(hash % 1000);
    
    if (type === 'user') {
      // For user avatars - use this format for consistent but random user images
      return `https://randomuser.me/api/portraits/${randomNum % 2 === 0 ? 'men' : 'women'}/${randomNum % 70 + 1}.jpg`;
    } else {
      // For post images - use Picsum Photos with the hash as seed
      return `https://picsum.photos/seed/${seed}/400/300`;
    }
  };