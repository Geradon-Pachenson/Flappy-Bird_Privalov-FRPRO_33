//Тип загружаемых данных
const RESOURCES_TYPE = {
    IMAGE: 'image',
}
class ResourcesLoader {
    _typeloadersMap = {
        //Изображение загружаем следующим образом. Принимаем сслыку, ширину и высоту изображения
        [RESOURCES_TYPE.IMAGE]: async ({src, width, height}) => {
            //Когда мы загрузили изображение мы можем зарезолвить Promise с данными этого изображения
            return new Promise((resolve, reject) => {
                //Содаем объект изображения
                const image = new Image(width, height);
                //Создаем обработчик по загрузке изображения
                image.addEventListener('load', () => resolve(image));
                image.addEventListener('error', (error) => reject(error));
                //Передаем src в изображение
                image.src = src;
            })
        }
    }

    //Асинхронная загрузка. Передаем тип, ссылку.
    async load(resource) {
        const loader = this._typeloadersMap[resource.type];
        return await loader(resource);
    } 

    //Можно создать класс, который будет содержать все загруженные нами ресурсы,чтобы иметь возможность загрузить их все вместе
}

//export default ResourcesLoader;