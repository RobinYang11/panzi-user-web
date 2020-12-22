export function isImage(url:string){
    const ImageArr = ['jpg','png','gif','webp','bmp']

    const arr = url.split('.');

    let lastItem = arr[arr.length-1]
    
    if(ImageArr.includes(lastItem)){
        return true;
    }
    
    return false;

}

export function isVideo(url:string){

    const ImageArr = ['mp4','MPEG','AVI','3GP'];

    const arr = url.split('.');

    let lastItem = arr[arr.length-1]
    
    if(ImageArr.includes(lastItem)){

        return true;
    }
    
    return false;


}
