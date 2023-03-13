export function getTimeDiffInWords(dateString: string) {
    const postDate = new Date(dateString);
    const currentDate = new Date();
    const diffInMs = currentDate.getTime() - postDate.getTime();
  
    // chuyển đổi từ milisecond sang giây, phút, giờ
    const diffInSecs = Math.round(diffInMs / 1000);
    const diffInMins = Math.round(diffInSecs / 60);
    const diffInHours = Math.round(diffInMins / 60);
  
    if (diffInHours >= 24) {
      const diffInDays = Math.round(diffInHours / 24);
      return `${diffInDays} ngày trước`;
    } else if (diffInHours > 0) {
      return `${diffInHours} giờ trước`;
    } else if (diffInMins > 0) {
      return `${diffInMins} phút trước`;
    } else {
      return `${diffInSecs} giây trước`;
    }
  }
  
  