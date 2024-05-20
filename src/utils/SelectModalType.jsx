import error_icon from '../assets/icons/error_icon.svg';
import checked_icon from '../assets/icons/checked_icon.svg';
import send_icon from '../assets/icons/send_icon.svg';
import reset_icon from '../assets/icons/reset_icon.svg';
import twinkle_icon from '../assets/icons/twinkle_icon.svg';
import default_profile from '../assets/icons/default_profile.svg';
import { useNavigate } from 'react-router-dom';

export const SelectModal = (type, rank) => {
    const navigate = useNavigate();

    const handleBack = () => navigate(-1);
    const handleMoveToRegist = () => console.log('회원가입으로 이동');
    const handleMoveToLink = () => console.log('백준 페이지로 이동');
    const handleMoveToMain = () => console.log('메인 페이지로 이동');
    const handleRejoinRoom = () => console.log('참여중인 페이지로 이동');
    switch (type) {
        case 'regist_modal':
        return {
            title: '회원가입으로 이동합니다!',
            icon: error_icon,
            body: '가입되지 않은 계정입니다.',
            buttonVisible: true,
            buttonAction: handleMoveToRegist,
        };
        case 'id_link_modal':
        return {
            title: '백준페이지로 이동합니다!',
            icon: error_icon,
            body: 'solved를 연동시켜주세요.',
            buttonVisible: true,
            buttonAction: handleMoveToLink,
        };
        case 'confirm_regist_modal':
        return {
            title: '가입이 완료되었습니다.',
            icon: checked_icon,
            body: null,
            buttonVisible: true,
            buttonAction: handleMoveToMain,
        };
        case 'rejoin_modal':
        return {
            title: '퇴장하지 않은 방이 있습니다!',
            icon: error_icon,
            body: '기존의 문제풀이 페이지로 재참여합니다.',
            buttonVisible: true,
            buttonAction: handleRejoinRoom,
        };
        case 'exit_modal':
        return {
            title: '퇴장하시나요?',
            icon: error_icon,
            body: '해당 문제는 코드 목록에 실패로 저장됩니다.',
            buttonVisible: true,
            buttonAction: handleMoveToMain,
        };
        case 'submit_code_modal':
        return {
            title: '백준에 코드를 제출하세요!',
            icon: send_icon,
            buttonVisible: false,
            body: '코드를 붙여넣기하여 제출해요!',
            buttons: [
            {
                text: '코드 복사하기',
                action: () => console.log('코드 복사하기'), // 여기에 실제 액션 추가
            },
            {
                text: '제출하러가기',
                action: () => console.log('제출하러가기'), // 여기에 실제 액션 추가
            },
            ],
        };
        case 'isSubmitted_code_modal':
        return {
            title: '백준에 코드를 제출하셨나요?',
            icon: send_icon,
            buttonVisible: false,
            body: '코드 제출 여부를 선택해주세요.',
            buttons: [
            {
                text: '아니요',
                action: () => console.log('아니요'), // 여기에 실제 액션 추가
            },
            {
                text: '사진 불러오기',
                action: () => console.log('제출 완료'), // 여기에 실제 액션 추가
            },
            ],
        };
        case 'failed_modal':
        return {
            title: '문제풀이에 실패했어요.',
            icon: reset_icon,
            body: '재도전을 위해 문제풀이로 돌아갑니다.',
            buttonVisible: true,
            buttonAction: handleBack,
        };
        case 'success_modal':
        return {
            title: `${rank}등으로 성공했어요!`,
            icon: twinkle_icon,
            body: '방에서 자동 퇴장됩니다.',
            buttonVisible: true,
            buttonAction: handleMoveToMain,
        };
        case 'edit_image_modal':
        return {
            title: null,
            icon: default_profile,
            buttonVisible: false,
            body: null,
            buttons: [
            {
                text: '기존 프로필로 변경',
                action: () => console.log('기존 프로필로 변경'), // 여기에 실제 액션 추가
            },
            {
                text: '사진 불러오기',
                action: () => console.log('사진 불러오기'), // 여기에 실제 액션 추가
            },
            ],
        };
        default:
        return '';
    }
};
