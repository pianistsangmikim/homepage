import React, { useState, useEffect } from "react";
import { PerformanceEvent, LanguageCode } from "./types";
import CMSAdminPanel from "./components/CMSAdminPanel";
import AIAdvisor from "./components/AIAdvisor";
import {
  Menu,
  X,
  Sliders,
  Globe,
  GraduationCap,
  Music,
  Award,
  BookOpen,
  Mail,
  MapPin,
  CheckCircle,
  ArrowRight,
  Youtube,
  Instagram,
  Linkedin,
  Clock,
  Sparkles,
  Search,
  Book,
  ChevronDown,
  Info,
  Plus
} from "lucide-react";

// Full Multilingual Dictionary representing her actual profile and dissertation
const DICTIONARY = {
  en: {
    // Nav Links
    home: "Home",
    about: "About Sangmi",
    services: "Services",
    live: "Live Performances",
    gallery: "Gallery",
    contact: "Contact",
    cmsTitle: "CMS Admin",

    // Hero Section
    badge: "Pianist & Scholar",
    mainSub: "Pianist & Musicologist",
    heroText: "Acclaimed soloist, collaborative pianist, and music researcher exploring the profound landscape of Spanish keyboard literature.",
    btnBook: "Inquire & Apply",
    btnBio: "About Sangmi",
    scroll: "Scroll",

    // About Section
    bioTitle: "About Sangmi",
    bioIntroHeading: "Poised, Colourful, and Deeply Communicative Playing",
    bioP1: "Pianist Sangmi Kim is an acclaimed soloist, collaborative pianist, and music researcher who recently completed her PhD at the Melbourne Conservatorium, The University of Melbourne under the supervision of Professor Jerry Wong and Professor Michael Christoforidis. Her doctoral project on the solo piano music of Alicia de Larrocha received outstanding commendations from her external examiners, highlighting both her exceptional performance standards and the deep scholarly importance of her research.",
    bioP2: "An artist of international pedigree, her training includes studies at the Royal Conservatory in Toronto under Professor John Perry, followed by a Master of Music degree from the Indiana University Jacobs School of Music under Professor Norman Krieger.",
    bioP3: "Praised by critics and examiners for her poised, colourful, and deeply communicative playing, celebrated for her vibrant, and warm tone quality. Her definitive doctoral performance portfolio bridges world-class artistry with original scholarship, positioning her as a leading voice in the preservation and performance of Spanish keyboard literature.",
    
    // Education Profile
    eduTitle: "Education Profile",
    edu1Date: "2021 - 2026",
    edu1Degree: "Doctor of Philosophy in Piano Performance",
    edu1School: "University of Melbourne, Fine Arts and Music",
    edu1Details: "Supervisors: Jerry Wong & Michael Christoforidis | Dissertation: Alicia de Larrocha as Pianist-Composer",
    edu2Date: "2018 - 2020",
    edu2Degree: "Master of Music in Piano Performance",
    edu2School: "Indiana University, Jacobs School of Music",
    edu2Details: "Studied with Prof. Norman Krieger",
    edu3Date: "2017 - 2018",
    edu3Degree: "Performer Diploma in Solo Piano Performance",
    edu3School: "Indiana University, Jacobs School of Music",
    edu3Details: "Studied with Prof. Norman Krieger",
    edu4Date: "2015 - 2017",
    edu4Degree: "Artist Diploma in Piano Performance",
    edu4School: "Gould School of The Royal Conservatory",
    edu4Details: "Studied with Prof. Andrew Burashko",
    edu5Date: "2011 - 2015",
    edu5Degree: "Bachelor of Music in Piano Performance",
    edu5School: "Gould School of The Royal Conservatory",
    edu5Details: "Studied with Prof. John Perry and Prof. David Louie",

    // Services Section
    srvSub: "PROFESSIONAL SERVICES",
    srvTitle: "Artistry & Instruction",
    srv1Title: "Performance & Accompaniment",
    srv1Desc: "Solo recitals, professional collaborative chamber music, university accompaniment, and academic lecture recitals featuring Spanish & European repertoire.",
    srv2Title: "Professional Tutoring",
    srv2Desc: "High school masterclasses, university-level coaching, and private individualized piano instruction designed to nurture artistic depth and technical precision.",
    srv3Title: "AMEB Exam Preparation",
    srv3Desc: "Structured pedagogical mentoring for all AMEB (Australian Music Examinations Board) grades, diplomas, and comprehensive performance portfolios.",
    detailsBtn: "Inquire & Apply",

    // Calendar
    calSub: "CALENDAR",
    calTitle: "Live Performances & Events",
    calDesc: "Join Sangmi Kim in her upcoming public recitals, university accompaniment works, and music lectures.",
    tblDate: "Date & Time",
    tblEvent: "Event / Program",
    tblVenue: "Venue",
    tblStatus: "Details",
    cmsNote: "The performances listed above can be edited or updated anytime using the CMS Admin panel.",

    // Gallery
    galleryTitle: "Photo Gallery",
    galPlace: "New photos can be uploaded and configured easily.",
    gal1Title: "Solo Piano performance de Larrocha Project",
    gal1Loc: "Melbourne Recital Hall",
    gal2Title: "Historical Spanish Piano Musicological Archives",
    gal2Loc: "Musicology Library",

    // Contact
    contactTitle: "Inquire & Apply",
    contactDesc: "For masterclasses, private lesson requests, collaborations, or performance reservations, please send an inquiry.",
    directTitle: "Direct Channels",
    emailLbl: "Email Address",
    locLbl: "Studio Location",
    webmasterLbl: "Webmaster Control",
    webmasterAction: "Log into CMS Settings",
    rights: "© 2026 Pianist Sangmi Kim. All rights reserved. Designed with premium responsive engine.",
    fmName: "Full Name",
    fmEmail: "Email Address",
    fmType: "Inquiry Type",
    fmMsg: "Message Details",
    fmo1: "Professional Tutoring",
    fmo2: "Performance & Accompaniment",
    fmo3: "AMEB Exam Preparation",
    fmo4: "Other Requests",
    fmSubmit: "Submit Secure Inquiry",
    fmSuccess: "Your inquiry has been dispatched to Dr. Sangmi Kim via Formspree successfully!"
  },
  ko: {
    home: "홈",
    about: "About Sangmi",
    services: "전문 분야",
    live: "공연 일정",
    gallery: "갤러리",
    contact: "문의",
    cmsTitle: "CMS 관리자",

    badge: "피아니스트 & 음악학 연구가",
    mainSub: "피아니스트 & 음악학 연구가",
    heroText: "멜버른 대학 박사 출신의 전문 독주자이자 반주자, 스페인 건반 음악 문헌 분야를 리딩하는 학술 연주가입니다.",
    btnBook: "신청 및 문의",
    btnBio: "About Sangmi",
    scroll: "스크롤",

    bioTitle: "About Sangmi (상미 소개)",
    bioIntroHeading: "차분하고 다채로우며, 마음 깊이 와닿는 교감의 울림",
    bioP1: "피아니스트 김상미는 솔리스트, 협연자, 그리고 음악학 연구가로서 다방면에서 찬사를 받고 있는 연주자입니다. 최근 호주 멜버른 대학교(The University of Melbourne) 콘서바토리움에서 Jerry Wong 교수와 Michael Christoforidis 교수의 세심한 지도 아래 박사(PhD) 학위를 수료하였습니다. 스페인의 위대한 피아니스트이자 작곡가인 알리시아 데 라로차(Alicia de Larrocha)의 독주 피아노 음악에 관한 그녀의 박사 학위 연구 논문은 외부 심사위원단으로부터 학술적 성취의 깊이와 세계적 수준의 연주 수준을 동시에 완벽하게 만족했다는 전례 없는 최고 평판을 받았습니다.",
    bioP2: "그녀는 일찍이 국제적 입지를 다진 인재로, 캐나다 토론토 왕립 음악원(The Glenn Gould School)에서 세계적 거장 John Perry 교수를 사수하며 탄탄한 기량을 닦았으며, 이후 미국 인디애나 대학교(Indiana University) Jacobs School of Music에서 Norman Krieger 교수의 사사로 음악 석사(MM) 학위를 성공적으로 수여받았습니다.",
    bioP3: "평단과 심사위원단으로부터 ‘품격이 가득 차 있고 화려하며 풍부한 색채감을 내뿜는 동시에, 지극히 소통력 높은 타건’이라는 호평을 연이어 받고 있습니다. 학술적 연구 성과와 완벽한 연주력을 융합하는 차별화된 학구파 아티스트로서 스페인 건반 음악을 계승 및 보존하고 무대로 끄집어내는 탁월한 선두 주자로 우뚝 서 있습니다.",

    eduTitle: "학력 및 커리어 프로필",
    edu1Date: "2021 - 2026",
    edu1Degree: "피아노 연주 박사 과정 (PhD)",
    edu1School: "멜버른 대학교 콘서바토리움",
    edu1Details: "사사: Jerry Wong, Michael Christoforidis 교수 | 박사 논문: 피아니스트 겸 작곡가로서의 알리시아 데 라로차 연구",
    edu2Date: "2018 - 2020",
    edu2Degree: "피아노 연주 석사 과정 (MM)",
    edu2School: "인디애나 대학교 자콥스 음악대학",
    edu2Details: "사사: Norman Krieger 교수",
    edu3Date: "2017 - 2018",
    edu3Degree: "솔로 피아노 연주 전문 연주자 디플로마 (PD)",
    edu3School: "인디애나 대학교 자콥스 음악대학",
    edu3Details: "사사: Norman Krieger 교수",
    edu4Date: "2015 - 2017",
    edu4Degree: "피아노 연주 최고 연주자 과정 (AD)",
    edu4School: "왕립 음악원 글렌 굴드 스쿨",
    edu4Details: "사사: Andrew Burashko 교수",
    edu5Date: "2011 - 2015",
    edu5Degree: "피아노 연주 음악 학사 과정 (BM)",
    edu5School: "왕립 음악원 글렌 굴드 스쿨",
    edu5Details: "사사: John Perry 및 David Louie 교수",

    srvSub: "전문 서비스 및 지도",
    srvTitle: "교육 및 연주 분야",
    srv1Title: "Performance & Accompaniment",
    srv1Desc: "전문적인 실내악 협연, 대학교 학부 및 석박사 전문 반주 서비스, 스페인 클래식 레퍼토리 중심의 렉처 콘서트를 전문으로 하고 있습니다.",
    srv2Title: "Professional Tutoring",
    srv2Desc: "현재 고등학교 전임 피아노 강사로서 학생들의 세밀한 테크닉 교정은 물론, 깊이 있는 음악성을 길러내는 맞춤형 개인 지도를 제공합니다.",
    srv3Title: "AMEB Exam Preparation",
    srv3Desc: "호주 음악 시험 위원회(AMEB)의 기초 등급(Grades)부터 전문 디플로마(Diploma) 시험까지 실기 및 포트폴리오를 완벽하게 빌드업합니다.",
    detailsBtn: "신청 및 문의",

    calSub: "스케줄",
    calTitle: "연주 및 렉처 캘린더",
    calDesc: "피아니스트 김상미의 다가오는 공개 독주회, 학술 렉처 콘서트 및 대학교 반주 일정을 실시간으로 공유합니다.",
    tblDate: "일정 및 시간",
    tblEvent: "연주 프로그램 및 행사명",
    tblVenue: "장소",
    tblStatus: "상세내역",
    cmsNote: "해당 공연 데이터베이스 목록은 CMS 관리자 모달을 통하여 원하시는 때에 즉각 추가 및 삭제하실 수 있습니다.",

    galleryTitle: "활동 갤러리",
    galPlace: "관리자 대시보드에서 새로운 콘서트 현장 사진을 손쉽게 구성하실 수 있습니다.",
    gal1Title: "멜버른 리사이틀 홀 알리시아 데 라로차 프로젝트 독주",
    gal1Loc: "멜버른 리사이틀 홀",
    gal2Title: "역사적 스페인 피아노 문헌 음악학 기록 보관소",
    gal2Loc: "음악학 도서관",

    contactTitle: "신청 및 문의",
    contactDesc: "렉처 세미나 초청, 실내악 및 반주 예약, 개인 레슨 상담 등 문의 사항을 남겨주시면 Formspree를 통해 안전하게 전달해 드리겠습니다.",
    directTitle: "다이렉트 연락망",
    emailLbl: "이메일 연락처",
    locLbl: "스튜디오 및 활동 영역",
    webmasterLbl: "웹마스터 환경 제어",
    webmasterAction: "CMS 제어 모드 켜기",
    rights: "© 2026 피아니스트 김상미. All rights reserved. 모바일 지원 반응형 웹엔진 작동중.",
    fmName: "성함 및 소속",
    fmEmail: "이메일 주소",
    fmType: "문의 항목 선택",
    fmMsg: "상세 문의 내용",
    fmo1: "Professional Tutoring (전문화된 피아노 지도)",
    fmo2: "Performance & Accompaniment (전문 연주 및 반주)",
    fmo3: "AMEB Exam Preparation (음악 시험 대비)",
    fmo4: "기타 비즈니스 요청사항",
    fmSubmit: "Formspree로 문의하기",
    fmSuccess: "문의 사항이 Formspree를 통해 김상미 피아니스트께 안전하게 전송되었습니다!"
  },
  zh: {
    home: "首页",
    about: "About Sangmi (关于桑美)",
    services: "专业服务",
    live: "演出日程",
    gallery: "现场影集",
    contact: "业务联络",
    cmsTitle: "后台管理",

    badge: "钢琴家 & 音乐学者",
    mainSub: "钢琴演奏家 & 艺术伴奏",
    heroText: "毕业于墨尔本大学音乐学院的知名钢琴独奏、协作演奏与音乐学家，致力于开拓西班牙键盘音乐文献领域。",
    btnBook: "申请与咨询",
    btnBio: "About Sangmi (关于桑美)",
    scroll: "滚动",

    bioTitle: "About Sangmi (关于桑美)",
    bioIntroHeading: "沉稳、色彩绚烂且充满深度艺术交融的琴声",
    bioP1: "钢琴演奏家金相美（Sangmi Kim）是一位备受赞誉的独奏家、艺术伴奏家和音乐学者。她近期在墨尔本大学音乐学院（Melbourne Conservatorium of Music, The University of Melbourne）成功取得钢琴演奏博士学位（PhD），师从 Jerry Wong 教授及 Michael Christoforidis 教授。她关于阿利西亚·德·拉罗查（Alicia de Larrocha）独奏钢琴音乐的博士论文获得了校外评审团的高度赞誉，赞扬了她极佳的演奏标准与非凡的学术价值。",
    bioP2: "作为一名具有国际背景的年轻艺术翘楚，她曾师从多伦多皇家音乐学院葛伦·古尔德学校（The Glenn Gould School）的世界级钢琴泰斗 John Perry 教授，随后在印第安纳大学雅各布斯音乐学院（Indiana University Jacobs School of Music）师从 Norman Krieger 教授并荣获音乐硕士（MM）学位。",
    bioP3: "她以细腻且极具情绪张力的触键、温暖迷人的音色广受各大考官及乐评人士的高度认可。金相美致力于将世界级高水准的指尖艺术与原创学术考证相融合，将自己定位为推广与保存西班牙键盘文献的核心代表人物之一。",

    eduTitle: "学术教育背景",
    edu1Date: "2021 - 2026",
    edu1Degree: "钢琴演奏博士学位 (PhD)",
    edu1School: "墨尔本大学音乐学院",
    edu1Details: "导师: Jerry Wong & Michael Christoforidis 教授 | 毕业论文: 研究作为钢琴家兼作曲家的阿利西亚·德·拉罗查",
    edu2Date: "2018 - 2020",
    edu2Degree: "钢琴演奏学硕士 (MM)",
    edu2School: "印第安纳大学雅各布斯音乐学院",
    edu2Details: "师从 Norman Krieger 教授",
    edu3Date: "2017 - 2018",
    edu3Degree: "独奏钢琴演奏艺术家文凭 (PD)",
    edu3School: "印第安纳大学雅各布斯音乐学院",
    edu3Details: "师从 Norman Krieger 教授",
    edu4Date: "2015 - 2017",
    edu4Degree: "钢琴演奏艺术家文凭 (AD)",
    edu4School: "皇家音乐学院格伦·古尔德学校",
    edu4Details: "师从 Andrew Burashko 教授",
    edu5Date: "2011 - 2015",
    edu5Degree: "钢琴演奏学学士 (BM)",
    edu5School: "皇家音乐学院格伦·古尔德学校",
    edu5Details: "师从 John Perry 和 David Louie 教授",

    srvSub: "专业教学服务",
    srvTitle: "演奏艺术与教学",
    srv1Title: "Performance & Accompaniment",
    srv1Desc: "提供专业重奏、独奏音乐会、学术讲座音乐会以及高校日常钢琴伴奏与大型协演业务。",
    srv2Title: "Professional Tutoring",
    srv2Desc: "目前担任高中专职钢琴教师，提供从古典入门、高级触键技法修正到舞台表现力的定制指导。",
    srv3Title: "AMEB Exam Preparation",
    srv3Desc: "对澳大利亚音乐考试委员会（AMEB）所有钢琴级别、演奏家文凭以及考纲音阶技术进行全面拔高。",
    detailsBtn: "申请与咨询",

    calSub: "日程表",
    calTitle: "现场演出及公开课日程",
    calDesc: "欢迎加入钢琴家金相美即将举办的公开演奏会、墨大协演音乐会以及学术讲座。",
    tblDate: "时间",
    tblEvent: "曲目及活动主题",
    tblVenue: "演出场所",
    tblStatus: "详细细节",
    cmsNote: "可以通过 CMS 控制面板随时增加、修改或删除上述音乐会数据列表。",

    galleryTitle: "精彩瞬间",
    galPlace: "可以使用虚拟 CMS 随时上传并部署最新的独奏舞台照片。",
    gal1Title: "墨尔本皇家音乐厅 - Alicia de Larrocha 项目独奏",
    gal1Loc: "墨尔本 Recital Hall",
    gal2Title: "西班牙古典键盘文献历史档案库",
    gal2Loc: "音乐学图书馆",

    contactTitle: "申请与咨询",
    contactDesc: "学术交流合作、伴奏委约、考级一对一课或大学师生排练伴奏，均可在此留言，我们将通过 Formspree 安全通知。",
    directTitle: "直达途径",
    emailLbl: "电子邮箱",
    locLbl: "工作室及常驻地",
    webmasterLbl: "网络主控台",
    webmasterAction: "启动后台管理模块",
    rights: "© 2026 钢琴演奏家 金相美。保留所有权利。移动端多向响应自适应系统。",
    fmName: "您的尊称 / 单位",
    fmEmail: "邮箱地址",
    fmType: "咨询内容分类",
    fmMsg: "具体诉求和详情",
    fmo1: "Professional Tutoring (高端钢琴指导)",
    fmo2: "Performance & Accompaniment (演奏与艺术伴奏)",
    fmo3: "AMEB Exam Preparation (考级与音乐评估)",
    fmo4: "其他商业邀约合作",
    fmSubmit: "通过 Formspree 安全递交",
    fmSuccess: "留言已通过 Formspree 顺利递交至金相美博士！"
  }
};

const DEFAULT_EVENTS: PerformanceEvent[] = [
  {
    date: "Aug 12, 2026 - 19:00",
    title: "Alicia de Larrocha Legacy Recital - Solo Piano Works",
    venue: "Melba Hall, Melbourne Conservatorium",
    details: "Guest Soloist"
  },
  {
    date: "Sep 25, 2026 - 14:00",
    title: "University Chamber Music Collaboration & Masterclass",
    venue: "Hanson Dyer Hall, Melbourne",
    details: "Collaborative Pianist"
  },
  {
    date: "Nov 05, 2026 - 18:30",
    title: "AMEB Premium Examination Preparation Workshop",
    venue: "Toorak Piano Studio, Melbourne",
    details: "Lecture Presenter"
  }
];

export default function App() {
  const [lang, setLang] = useState<LanguageCode>("en");
  const [isCmsOpen, setIsCmsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // CMS Editable Settings - Lazy initialization from localStorage to prevent default values from overwriting custom user inputs on mount
  const [brandName, setBrandName] = useState<string>(() => {
    return localStorage.getItem("sangmi_portfolio_brand") || "SANGMI KIM";
  });
  const [accentColor, setAccentColor] = useState<string>(() => {
    return localStorage.getItem("sangmi_portfolio_accent") || "#8B5CF6";
  });
  const [events, setEvents] = useState<PerformanceEvent[]>(() => {
    try {
      const savedEvents = localStorage.getItem("sangmi_portfolio_events");
      return savedEvents ? JSON.parse(savedEvents) : DEFAULT_EVENTS;
    } catch (e) {
      console.error(e);
      return DEFAULT_EVENTS;
    }
  });
  const [profileImage, setProfileImage] = useState<string>(() => {
    return localStorage.getItem("sangmi_portfolio_profile_image") || "https://images.unsplash.com/photo-1571235917583-f848550413a3?q=80&w=1200";
  });
  const [heroBgImage, setHeroBgImage] = useState<string>(() => {
    return localStorage.getItem("sangmi_portfolio_hero_bg_image") || "https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=1600";
  });

  // Contact Form State
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formType, setFormType] = useState("lesson");
  const [formMsg, setFormMsg] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Save changes to localStorage automatically when state updates
  useEffect(() => {
    localStorage.setItem("sangmi_portfolio_events", JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem("sangmi_portfolio_brand", brandName);
  }, [brandName]);

  useEffect(() => {
    localStorage.setItem("sangmi_portfolio_profile_image", profileImage);
  }, [profileImage]);

  useEffect(() => {
    localStorage.setItem("sangmi_portfolio_hero_bg_image", heroBgImage);
  }, [heroBgImage]);

  useEffect(() => {
    localStorage.setItem("sangmi_portfolio_accent", accentColor);
    
    // Inject Custom Accent Color variable styling
    const styleId = "custom-accent-colors";
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement("style");
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }
    styleTag.innerHTML = `
      .text-brandAccent { color: ${accentColor} !important; }
      .bg-brandAccent { background-color: ${accentColor} !important; }
      .border-brandAccent { border-color: ${accentColor} !important; }
      .hover\\:bg-brandAccent:hover { background-color: ${accentColor} !important; }
      .hover\\:text-brandAccent:hover { color: ${accentColor} !important; }
      .hover\\:border-brandAccent:hover { border-color: ${accentColor} !important; }
      .focus\\:ring-brandAccent:focus { --tw-ring-color: ${accentColor} !important; }
      .focus\\:border-brandAccent:focus { border-color: ${accentColor} !important; }
    `;
  }, [accentColor]);

  const t = DICTIONARY[lang];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMsg) return;

    setIsSubmitting(true);
    setFormError(false);
    setFormSuccess(false);

    try {
      const response = await fetch("https://formspree.io/f/xwvdojde", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          inquiryType: formType,
          message: formMsg
        })
      });

      if (response.ok) {
        setFormSuccess(true);
        setFormName("");
        setFormEmail("");
        setFormMsg("");
        setTimeout(() => {
          setFormSuccess(false);
        }, 8000);
      } else {
        setFormError(true);
        setTimeout(() => {
          setFormError(false);
        }, 8000);
      }
    } catch (err) {
      console.error(err);
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleServiceInquiry = (type: string) => {
    setFormType(type);
    const contactSec = document.getElementById("contact");
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-slate-200 selection:bg-purple-500 selection:text-white transition-colors duration-300">
      
      {/* 1. TOP NAVIGATION BAR */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#08080a]/90 backdrop-blur-md border-b border-purple-950/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo / Title */}
          <a href="#home" className="flex flex-col group">
            <span className="header-serif text-lg md:text-xl font-bold tracking-[0.2em] text-white group-hover:text-brandAccent transition">
              {brandName}
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-purple-400 font-semibold mt-0.5">
              {t.mainSub}
            </span>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-wider uppercase">
            <a href="#home" className="hover:text-brandAccent text-gray-300 transition duration-150">{t.home}</a>
            <a href="#about" className="hover:text-brandAccent text-gray-300 transition duration-150">{t.about}</a>
            <a href="#services" className="hover:text-brandAccent text-gray-300 transition duration-150">{t.services}</a>
            <a href="#performances" className="hover:text-brandAccent text-gray-300 transition duration-150">{t.live}</a>
            <a href="#gallery" className="hover:text-brandAccent text-gray-300 transition duration-150">{t.gallery}</a>
            <a href="#contact" className="hover:text-brandAccent text-gray-300 transition duration-150">{t.contact}</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Language Switcher */}
            <div className="flex items-center bg-[#121216] border border-purple-950/40 rounded-lg px-2.5 py-1 text-xs text-white">
              <Globe className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as LanguageCode)}
                className="bg-transparent focus:outline-none cursor-pointer text-[11px] font-medium"
              >
                <option value="en" className="bg-[#121216]">English</option>
                <option value="ko" className="bg-[#121216]">한국어</option>
                <option value="zh" className="bg-[#121216]">中文</option>
              </select>
            </div>

            {/* CMS Trigger button */}
            <button
              onClick={() => setIsCmsOpen(true)}
              className="flex items-center gap-1.5 border border-purple-900/60 hover:bg-brandAccent text-white text-[11px] px-3.5 py-1.5 rounded-lg transition font-semibold"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t.cmsTitle}</span>
            </button>
          </div>

          {/* Mobile hamburger & lang toggle buttons */}
          <div className="flex items-center lg:hidden space-x-3">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as LanguageCode)}
              className="bg-[#121216] text-white border border-purple-950/40 rounded px-1.5 py-1 text-[10px] focus:outline-none"
            >
              <option value="en">EN</option>
              <option value="ko">KO</option>
              <option value="zh">ZH</option>
            </select>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-brandAccent focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#08080a] border-b border-purple-950/40 px-6 py-6 space-y-4">
            <nav className="flex flex-col space-y-3 text-xs font-semibold uppercase tracking-wider">
              <a href="#home" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-brandAccent py-1.5">{t.home}</a>
              <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-brandAccent py-1.5">{t.about}</a>
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-brandAccent py-1.5">{t.services}</a>
              <a href="#performances" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-brandAccent py-1.5">{t.live}</a>
              <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-brandAccent py-1.5">{t.gallery}</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-brandAccent py-1.5">{t.contact}</a>
              
              <button
                onClick={() => {
                  setIsCmsOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left bg-purple-950/40 text-brandAccent py-2.5 px-3 rounded-lg text-[11px] font-bold border border-purple-800/40 flex items-center justify-between"
              >
                <span>CMS Admin Settings</span>
                <Sliders className="w-4 h-4" />
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(8, 8, 10, 0.4) 0%, rgba(8, 8, 10, 0.95) 100%), url('${heroBgImage}')` }}>
        
        {/* Soft layout filter overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-transparent to-[#08080a] opacity-80" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-brandAccent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-900/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 py-20 text-center z-10 space-y-6">
          {/* Centered Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-brandAccent/20 rounded-2xl blur-md group-hover:bg-brandAccent/45 transition duration-300" />
              <img
                src={profileImage}
                alt={brandName}
                referrerPolicy="no-referrer"
                className="relative w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-2xl object-cover border-2 border-brandAccent/40 shadow-2xl group-hover:scale-102 transition duration-300"
              />
            </div>
          </div>

          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] bg-purple-950/50 border border-brandAccent/40 text-purple-300 rounded-full">
            {t.badge}
          </span>

          <h1 className="header-serif text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-widest leading-none">
            {brandName}
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-gray-300 font-light leading-relaxed">
            {t.heroText}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="#contact" className="w-full sm:w-auto bg-brandAccent hover:bg-opacity-90 text-white font-semibold text-xs tracking-wider uppercase px-8 py-4 rounded-xl transition duration-200 shadow-lg shadow-purple-950/40">
              {t.btnBook}
            </a>
            <a href="#about" className="w-full sm:w-auto border border-white/25 hover:border-brandAccent text-white hover:text-brandAccent font-semibold text-xs tracking-wider uppercase px-8 py-4 rounded-xl transition duration-200">
              {t.btnBio}
            </a>
          </div>
        </div>

        {/* Floating scroll down prompt */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-500 text-[10px] tracking-widest uppercase animate-bounce">
          <span>{t.scroll}</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </section>

      {/* 3. BIOGRAPHY SECTION */}
      <section id="about" className="py-24 bg-[#08080a] relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16 space-y-3">
            <h2 className="header-serif text-3xl md:text-4xl font-bold tracking-wider text-white">
              {t.bioTitle}
            </h2>
            <div className="w-16 h-1 bg-brandAccent mx-auto rounded" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Biography Profile Photo Sidebar */}
            <div className="lg:col-span-3 flex flex-col items-center gap-4">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-purple-950/40 group shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent opacity-60 z-10" />
                <img
                  src={profileImage}
                  alt="Sangmi Kim Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
                />
              </div>
              <p className="text-[10px] text-gray-500 font-light tracking-wide text-center">
                Dr. Sangmi Kim — Official Portrait
              </p>
            </div>

            {/* Biography copy */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="header-serif text-xl md:text-2xl font-semibold text-purple-300 leading-snug">
                {t.bioIntroHeading}
              </h3>

              <div className="text-gray-300 space-y-5 leading-relaxed text-xs md:text-sm font-light">
                <p>{t.bioP1}</p>
                <p>{t.bioP2}</p>
                <p>{t.bioP3}</p>
              </div>

              {/* Social Channels badges */}
              <div className="pt-6 border-t border-purple-950/40 flex items-center gap-4 flex-wrap">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-bold">Connect:</span>
                <div className="flex space-x-3">
                  <a href="#" className="w-9 h-9 rounded-full bg-[#121216] border border-purple-950/40 flex items-center justify-center text-gray-400 hover:bg-brandAccent hover:text-white transition">
                    <Youtube className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-[#121216] border border-purple-950/40 flex items-center justify-center text-gray-400 hover:bg-brandAccent hover:text-white transition">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-9 h-9 rounded-full bg-[#121216] border border-purple-950/40 flex items-center justify-center text-gray-400 hover:bg-brandAccent hover:text-white transition">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Scholar timeline sidecar */}
            <div className="lg:col-span-4 bg-[#121216] border border-purple-950/40 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-brandAccent/10 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="header-serif text-base font-bold text-white mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-300" />
                <span>{t.eduTitle}</span>
              </h3>

              {/* Vertical timeline items */}
              <div className="space-y-6 relative border-l border-purple-950/60 ml-2.5">
                
                {/* PhD */}
                <div className="relative pl-6">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-brandAccent ring-4 ring-purple-950/30" />
                  <span className="text-[10px] font-bold text-purple-400 tracking-wider block">{t.edu1Date}</span>
                  <h4 className="font-bold text-white text-xs mt-0.5">{t.edu1Degree}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">{t.edu1School}</p>
                  <p className="text-[10px] text-purple-300/80 mt-1 italic leading-relaxed">{t.edu1Details}</p>
                </div>

                {/* Masters */}
                <div className="relative pl-6">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-950" />
                  <span className="text-[10px] font-bold text-gray-400 tracking-wider block">{t.edu2Date}</span>
                  <h4 className="font-bold text-white text-xs mt-0.5">{t.edu2Degree}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">{t.edu2School}</p>
                  <p className="text-[10px] text-purple-300/80 mt-1 italic leading-relaxed">{t.edu2Details}</p>
                </div>

                {/* Performer Diploma */}
                <div className="relative pl-6">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-950" />
                  <span className="text-[10px] font-bold text-gray-400 tracking-wider block">{t.edu3Date}</span>
                  <h4 className="font-bold text-white text-xs mt-0.5">{t.edu3Degree}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">{t.edu3School}</p>
                  <p className="text-[10px] text-purple-300/80 mt-1 italic leading-relaxed">{t.edu3Details}</p>
                </div>

                {/* Artist Diploma */}
                <div className="relative pl-6">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-950" />
                  <span className="text-[10px] font-bold text-gray-400 tracking-wider block">{t.edu4Date}</span>
                  <h4 className="font-bold text-white text-xs mt-0.5">{t.edu4Degree}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">{t.edu4School}</p>
                  <p className="text-[10px] text-purple-300/80 mt-1 italic leading-relaxed">{t.edu4Details}</p>
                </div>

                {/* Bachelor */}
                <div className="relative pl-6">
                  <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-950" />
                  <span className="text-[10px] font-bold text-gray-400 tracking-wider block">{t.edu5Date}</span>
                  <h4 className="font-bold text-white text-xs mt-0.5">{t.edu5Degree}</h4>
                  <p className="text-[11px] text-gray-400 mt-0.5">{t.edu5School}</p>
                  <p className="text-[10px] text-purple-300/80 mt-1 italic leading-relaxed">{t.edu5Details}</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="services" className="py-24 bg-[#121216] relative overflow-hidden border-y border-purple-950/10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brandAccent font-bold">
              {t.srvSub}
            </span>
            <h2 className="header-serif text-3xl md:text-4xl font-bold tracking-wider text-white">
              {t.srvTitle}
            </h2>
            <div className="w-16 h-1 bg-brandAccent mx-auto rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Service 1 */}
            <button
              onClick={() => handleServiceInquiry("accomp")}
              className="bg-[#08080a] border border-purple-950/40 p-6 rounded-2xl flex flex-col justify-between group hover:-translate-y-1 hover:border-purple-800/60 transition duration-300 text-left w-full cursor-pointer focus:outline-none"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 bg-purple-950/40 rounded-lg flex items-center justify-center text-purple-300 group-hover:bg-brandAccent group-hover:text-white transition">
                  <Music className="w-5 h-5" />
                </div>
                <h3 className="header-serif font-bold text-sm text-white">{t.srv1Title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{t.srv1Desc}</p>
              </div>
              <span className="text-[10px] text-brandAccent font-bold tracking-wider uppercase flex items-center gap-1 mt-6">
                <span>{t.detailsBtn}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            {/* Service 2 */}
            <button
              onClick={() => handleServiceInquiry("lesson")}
              className="bg-[#08080a] border border-purple-950/40 p-6 rounded-2xl flex flex-col justify-between group hover:-translate-y-1 hover:border-purple-800/60 transition duration-300 text-left w-full cursor-pointer focus:outline-none"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 bg-purple-950/40 rounded-lg flex items-center justify-center text-purple-300 group-hover:bg-brandAccent group-hover:text-white transition">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="header-serif font-bold text-sm text-white">{t.srv2Title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{t.srv2Desc}</p>
              </div>
              <span className="text-[10px] text-brandAccent font-bold tracking-wider uppercase flex items-center gap-1 mt-6">
                <span>{t.detailsBtn}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            {/* Service 3 */}
            <button
              onClick={() => handleServiceInquiry("recital")}
              className="bg-[#08080a] border border-purple-950/40 p-6 rounded-2xl flex flex-col justify-between group hover:-translate-y-1 hover:border-purple-800/60 transition duration-300 text-left w-full cursor-pointer focus:outline-none"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 bg-purple-950/40 rounded-lg flex items-center justify-center text-purple-300 group-hover:bg-brandAccent group-hover:text-white transition">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="header-serif font-bold text-sm text-white">{t.srv3Title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{t.srv3Desc}</p>
              </div>
              <span className="text-[10px] text-brandAccent font-bold tracking-wider uppercase flex items-center gap-1 mt-6">
                <span>{t.detailsBtn}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

          </div>
        </div>
      </section>

      {/* 5. PERFORMANCES SECTION */}
      <section id="performances" className="py-24 bg-[#08080a] relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-purple-400 font-bold block">
              {t.calSub}
            </span>
            <h2 className="header-serif text-3xl md:text-4xl font-bold tracking-wider text-white">
              {t.calTitle}
            </h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
              {t.calDesc}
            </p>
            <div className="w-16 h-1 bg-brandAccent mx-auto rounded mt-3" />
          </div>

          {/* Table representing actual concerts and Masterclasses */}
          <div className="bg-[#121216] border border-purple-950/40 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-purple-950/10 border-b border-purple-950/30 text-[10px] font-bold uppercase tracking-wider text-purple-300">
                    <th className="py-4.5 px-6">{t.tblDate}</th>
                    <th className="py-4.5 px-6">{t.tblEvent}</th>
                    <th className="py-4.5 px-6">{t.tblVenue}</th>
                    <th className="py-4.5 px-6 text-right">{t.tblStatus}</th>
                  </tr>
                </thead>
                <tbody className="text-xs md:text-sm divide-y divide-purple-950/10">
                  {events.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 px-6 text-center text-gray-500 italic font-light">
                        No upcoming performances scheduled at this time.
                      </td>
                    </tr>
                  ) : (
                    events.map((evt, idx) => (
                      <tr key={idx} className="hover:bg-purple-950/5 transition duration-150">
                        <td className="py-4 px-6 text-white font-medium whitespace-nowrap">
                          {evt.date}
                        </td>
                        <td className="py-4 px-6 text-gray-200">
                          <div className="font-bold">{evt.title}</div>
                        </td>
                        <td className="py-4 px-6 text-gray-400 text-xs whitespace-nowrap">
                          {evt.venue}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <span className="inline-block px-2.5 py-0.5 bg-purple-950/40 border border-purple-900/30 text-purple-300 text-[9px] font-bold uppercase rounded tracking-wider">
                            {evt.details}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-[10px] text-gray-500 mt-4 text-center leading-relaxed">
            * {t.cmsNote}
          </p>
        </div>
      </section>

      {/* 6. PHOTO GALLERY */}
      <section id="gallery" className="py-24 bg-[#121216] border-y border-purple-950/10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center mb-16 space-y-3">
            <h2 className="header-serif text-3xl md:text-4xl font-bold tracking-wider text-white">
              {t.galleryTitle}
            </h2>
            <div className="w-16 h-1 bg-brandAccent mx-auto rounded" />
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Gallery Image 1 */}
            <div className="relative group overflow-hidden rounded-xl aspect-[4/3] bg-[#08080a] border border-purple-950/40 shadow-md">
              <img
                src={profileImage}
                alt="Solo Recital"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 flex flex-col justify-end p-5">
                <span className="text-[9px] text-purple-400 font-bold uppercase tracking-wider">{t.gal1Loc}</span>
                <h4 className="font-serif font-bold text-white text-xs mt-1">{t.gal1Title}</h4>
              </div>
            </div>

            {/* Gallery Image 2 */}
            <div className="relative group overflow-hidden rounded-xl aspect-[4/3] bg-[#08080a] border border-purple-950/40 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1200"
                alt="Historical Scores"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 flex flex-col justify-end p-5">
                <span className="text-[9px] text-purple-400 font-bold uppercase tracking-wider">{t.gal2Loc}</span>
                <h4 className="font-serif font-bold text-white text-xs mt-1">{t.gal2Title}</h4>
              </div>
            </div>

            {/* Interactive / Dynamic placeholder */}
            <div className="w-full h-full bg-[#08080a] border-2 border-dashed border-purple-950/40 rounded-xl flex items-center justify-center p-6 text-center">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-full bg-purple-950/30 text-purple-400 flex items-center justify-center mx-auto">
                  <Plus className="w-4 h-4" />
                </div>
                <p className="text-[11px] text-gray-500 font-light max-w-[180px] mx-auto">
                  {t.galPlace}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CONTACT & INQUIRIES SECTION */}
      <section id="contact" className="py-24 bg-[#08080a] relative">
        <div className="max-w-6xl mx-auto px-6">
          
          <div className="text-center mb-16 space-y-3">
            <h2 className="header-serif text-3xl md:text-4xl font-bold tracking-wider text-white">
              {t.contactTitle}
            </h2>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              {t.contactDesc}
            </p>
            <div className="w-16 h-1 bg-brandAccent mx-auto rounded mt-3" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Contact Channels Details */}
            <div className="lg:col-span-5 bg-[#121216] border border-purple-950/40 rounded-2xl p-8 space-y-6 flex flex-col justify-between h-full min-h-[460px]">
              <div className="space-y-6">
                <h3 className="header-serif text-base font-bold text-white tracking-wider uppercase">
                  {t.directTitle}
                </h3>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-950/40 text-purple-300 border border-purple-900/30 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t.emailLbl}</h4>
                    <p className="text-xs text-white font-medium mt-0.5 select-all">sangmi.piano@unimelb.edu.au</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-950/40 text-purple-300 border border-purple-900/30 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t.locLbl}</h4>
                    <p className="text-xs text-white font-medium mt-0.5">Melbourne, VIC, Australia</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-t border-purple-950/30 pt-6">
                  <div className="w-9 h-9 rounded-xl bg-purple-950/40 text-purple-300 border border-purple-900/30 flex items-center justify-center shrink-0">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{t.webmasterLbl}</h4>
                    <button
                      onClick={() => setIsCmsOpen(true)}
                      className="text-xs text-purple-400 hover:underline hover:text-purple-300 transition text-left mt-0.5 font-semibold"
                    >
                      {t.webmasterAction}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-purple-950/30 text-[10px] text-gray-500 leading-relaxed font-light">
                <p>{t.rights}</p>
              </div>
            </div>

            {/* Right: Simulated secure message dispatch */}
            <div className="lg:col-span-7 bg-[#121216] border border-purple-950/40 rounded-2xl p-8">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">
                    {t.fmName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-[#08080a] text-white border border-purple-950/60 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-purple-400 transition"
                    placeholder="e.g. John Smith"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">
                    {t.fmEmail}
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full bg-[#08080a] text-white border border-purple-950/60 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-purple-400 transition"
                    placeholder="e.g. Johnsmith15231@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">
                    {t.fmType}
                  </label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    className="w-full bg-[#08080a] text-white border border-purple-950/60 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-purple-400 transition cursor-pointer"
                  >
                    <option value="lesson">{t.fmo1}</option>
                    <option value="accomp">{t.fmo2}</option>
                    <option value="recital">{t.fmo3}</option>
                    <option value="other">{t.fmo4}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1.5">
                    {t.fmMsg}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    className="w-full bg-[#08080a] text-white border border-purple-950/60 rounded-xl p-4 text-xs focus:outline-none focus:border-purple-400 transition resize-none leading-relaxed"
                    placeholder="Provide details about your query..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brandAccent hover:bg-opacity-95 text-white font-bold text-xs tracking-wider uppercase py-4 rounded-xl transition duration-150 shadow-md shadow-purple-950/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Submitting to Formspree...</span>
                    </>
                  ) : (
                    <span>{t.fmSubmit}</span>
                  )}
                </button>

                {formSuccess && (
                  <div className="p-3.5 bg-emerald-950/30 text-emerald-400 text-xs rounded-xl border border-emerald-900/40 text-center flex items-center justify-center gap-1.5 animate-fade-in mt-3">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{t.fmSuccess}</span>
                  </div>
                )}

                {formError && (
                  <div className="p-3.5 bg-rose-950/30 text-rose-400 text-xs rounded-xl border border-rose-900/40 text-center flex items-center justify-center gap-1.5 animate-fade-in mt-3">
                    <span>There was an error submitting your form to Formspree. Please try again or email directly.</span>
                  </div>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 8. EXPERT AI RESEARCH CONSULTING SECTION */}
      <section className="py-24 bg-[#121216] border-t border-purple-950/10 relative">
        <div className="max-w-4xl mx-auto px-6">
          <AIAdvisor accentColor={accentColor} />
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-black py-10 border-t border-purple-950/15 text-center px-6">
        <p className="text-[11px] text-gray-600 font-light">
          Powered by Sangmi Kim Portfolio System • Built with Premium Full-Stack React & Tailwind CSS Engine • 2026
        </p>
      </footer>

      {/* Interactive CMS Admin Modal */}
      <CMSAdminPanel
        isOpen={isCmsOpen}
        onClose={() => setIsCmsOpen(false)}
        brandName={brandName}
        setBrandName={setBrandName}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
        events={events}
        setEvents={setEvents}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
        heroBgImage={heroBgImage}
        setHeroBgImage={setHeroBgImage}
      />
    </div>
  );
}
