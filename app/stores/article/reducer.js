import * as types from './action-types';
import * as user_types from '../user/action-types';
import * as utils from '../../utils/';

const initialNavState = {
    list_article : [
        {
            coordinate: {
                latitude: 16.4684685,
                longitude: 107.5764258,
            },
            title: 'Đại Nội',
            description: 'Đại nội kinh thành ',
            id: 1,
        }
    ],
    detail_article: {
        images: [
            "https://www.vntrip.vn/cam-nang/wp-content/uploads/2017/03/Dai-Noi-Hue-e1502360866685.png",
            "https://static.mytour.vn/upload_images/Image/trungNew%20Folder/aNew%20Folder/b/c/d/h1.jpg",
            "http://2.bp.blogspot.com/-QDDUz_YkhoY/VkrwcLKkfhI/AAAAAAABgK4/--7SrK1oCCA/s1600/Hue-tham-quan-dai-noi-01.JPG",
        ],
        title: "Thăm Đại Nội Huế Cổ Kính Uy Nghiêm - Di Tích Của Một Vương Triều",
        content: "Đại Nội gồm Hoàng thành và Tử Cấm Thành, Hoàng Thành là vòng thành thứ hai bên trong Kinh thành Huế, có chức năng bảo vệ các cung điện dành cho nhà vua và các đại thần, các miếu thờ tổ tiên hoàng tộc và bảo vệ Tử Cấm Thành\n" +
        "Tử Cấm Thành là nơi chỉ dành riêng cho vua và người trong hoàng tộc, tên gọi cũng có nghĩa là thành cấm màu tía, tức nơi ở của thiên tử, cấm thường dân lui tới.\n" +
        "Ðiện Thái Hoà xây dựng năm 1805 đời Gia Long; năm 1806 Gia Long chính thức tổ chức lễ đăng quang tại Ðiện này. Ðiện Thái Hoà là nơi tổ chức những lễ lớn của triều đình như lễ lên ngôi, lễ phong Hoàng Thái tử, lễ tiếp đón sứ thần nước lớn, lễ Vạn thọ...\n" +
        "Thế Tổ Miếu thường gọi là Thế Miếu hướng tây nam bên trong Hoàng thành, là nơi thờ các vị vua triều Nguyễn. Đây là nơi triều đình đến cúng tế các vị vua quá cố, điều đặc biệt là chỉ phái nam được quyền tham dự lễ này."
    }
}

export default function reduce(state = initialNavState, action = {}) {
    switch (action.type) {
        default:
            return state;
    }
}