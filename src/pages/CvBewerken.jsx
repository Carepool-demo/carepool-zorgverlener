import { useState } from 'react'
import { BackArrowIcon, PlusIcon, ChevronRightIcon } from '@shared/components/Icons'
import './CvBewerken.css'

/* ---- CV-specific icons (same as ZorgverlenerProfiel) ---- */
function GraduationIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.7725 2.26657C11.9248 2.24448 12.0753 2.24448 12.2276 2.26657C13.7896 2.49323 15.6905 3.25556 17.4258 4.09078C19.1786 4.9344 20.8337 5.88767 21.9249 6.54586C23.0252 7.20965 23.0252 8.79027 21.9249 9.45407C21.7192 9.5781 21.4926 9.7112 21.2501 9.85348V16.3457L22.6251 19.5478C23.0627 20.5677 22.306 21.75 21.1719 21.75H19.8292C18.6951 21.75 17.9383 20.5677 18.376 19.5478L19.7501 16.3457V10.706C19.4181 10.8884 19.0726 11.0752 18.7169 11.2607L17.7403 17.123C17.7099 17.3053 17.6131 17.4705 17.4688 17.5859L17.4649 17.5888C17.4392 17.6087 17.375 17.6591 17.337 17.6875C17.2565 17.7476 17.14 17.8316 16.9942 17.9316C16.7033 18.1311 16.2891 18.3965 15.7911 18.6621C14.8114 19.1846 13.4312 19.75 12.0001 19.75C10.5691 19.7499 9.18965 19.1845 8.21002 18.6621C7.71183 18.3964 7.2969 18.1311 7.00592 17.9316C6.86038 17.8318 6.74461 17.7476 6.66412 17.6875C6.62567 17.6588 6.56031 17.6083 6.53522 17.5888L6.53229 17.5859C6.3881 17.4705 6.29117 17.3052 6.2608 17.123L5.28326 11.2607C4.02809 10.6063 2.89316 9.94742 2.07525 9.45407C0.974915 8.79027 0.974915 7.20965 2.07525 6.54586C3.16644 5.88767 4.82156 4.9344 6.57428 4.09078C8.30961 3.25556 10.2105 2.49323 11.7725 2.26657ZM19.754 20.1396C19.7499 20.1495 19.7453 20.1743 19.7686 20.2099C19.7795 20.2265 19.792 20.2375 19.8018 20.2431C19.8097 20.2476 19.8176 20.25 19.8292 20.25H21.1719C21.1835 20.25 21.1914 20.2476 21.1993 20.2431C21.2091 20.2375 21.2216 20.2265 21.2325 20.2099C21.2558 20.1743 21.2512 20.1495 21.2471 20.1396L20.5001 18.4013L19.754 20.1396ZM17.0596 12.08C15.426 12.8456 13.6809 13.5225 12.2276 13.7334C12.0753 13.7555 11.9248 13.7555 11.7725 13.7334C10.3193 13.5225 8.574 12.8465 6.94049 12.081L7.69049 16.5791C7.73808 16.6131 7.79239 16.6523 7.85358 16.6943C8.10945 16.8698 8.47697 17.1037 8.91608 17.3379C9.81134 17.8153 10.9313 18.2499 12.0001 18.25C13.0689 18.25 14.1897 17.8154 15.085 17.3379C15.5239 17.1037 15.8908 16.8697 16.1465 16.6943C16.2078 16.6523 16.262 16.6132 16.3096 16.5791L17.0596 12.08ZM11.9874 3.75094C10.6645 3.94298 8.9371 4.61863 7.22565 5.44235C5.53147 6.25777 3.91975 7.18458 2.84967 7.83004C2.71651 7.91056 2.71651 8.08937 2.84967 8.16989C3.91975 8.81535 5.53147 9.74216 7.22565 10.5576C8.9371 11.3813 10.6645 12.0569 11.9874 12.249C11.9969 12.2504 12.0032 12.2504 12.0128 12.249C13.3357 12.0569 15.063 11.3813 16.7745 10.5576C18.4687 9.74216 20.0804 8.81535 21.1504 8.16989C21.2836 8.08937 21.2836 7.91056 21.1504 7.83004C20.0804 7.18458 18.4687 6.25777 16.7745 5.44235C15.063 4.61863 13.3357 3.94298 12.0128 3.75094C12.0032 3.74955 11.9969 3.74955 11.9874 3.75094Z" fill="currentColor" />
    </svg>
  )
}

function BriefcaseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12.1463 1.75C12.7166 1.74996 13.2153 1.75015 13.6258 1.80371C14.073 1.8621 14.49 1.99147 14.8631 2.29883C15.2276 2.59917 15.4495 2.98687 15.6258 3.41992C15.794 3.83315 15.9475 4.35991 16.1307 4.98828L16.2069 5.25H18.6708C19.2847 5.24977 19.7207 5.2501 20.0887 5.33496C21.1188 5.57258 21.9977 6.31303 22.2108 7.34766C22.2859 7.71233 22.236 8.12543 22.1776 8.60742C22.1733 8.64269 22.1682 8.67884 22.1639 8.71485C22.0704 9.4941 21.7979 10.1576 21.3055 10.6943L21.4852 12.7676C21.657 14.7596 21.7925 16.3296 21.7372 17.5615C21.6805 18.8225 21.4212 19.8549 20.6991 20.6885C19.9712 21.5287 19.0022 21.9026 17.7967 22.0791C16.63 22.2499 15.1275 22.25 13.2372 22.25H10.7616C8.87148 22.25 7.3696 22.2499 6.20299 22.0791C4.99747 21.9026 4.02857 21.5287 3.30065 20.6885C2.57853 19.8549 2.31919 18.8225 2.26256 17.5615C2.20724 16.3296 2.34272 14.7596 2.51451 12.7676L2.69225 10.6963C2.19941 10.1594 1.92739 9.49452 1.83385 8.71485C1.82953 8.67884 1.82543 8.64268 1.82115 8.60742C1.76274 8.1254 1.71284 7.71235 1.78795 7.34766C2.00107 6.31318 2.87913 5.57265 3.90904 5.33496C4.27702 5.25008 4.71312 5.24977 5.32701 5.25H7.79088L7.86705 4.98828C8.05031 4.35991 8.20373 3.83315 8.37194 3.41992C8.54829 2.98671 8.77092 2.59923 9.13561 2.29883C9.50884 1.99141 9.92562 1.86207 10.3729 1.80371C10.7833 1.75018 11.2814 1.74997 11.8514 1.75H12.1463ZM19.8827 11.6445C19.6846 11.7255 19.478 11.7989 19.2626 11.8623L15.0907 13.0898C15.0535 13.1008 15.0167 13.1114 14.9803 13.1221C13.6604 13.5109 12.8492 13.75 11.9989 13.75C11.1487 13.75 10.3382 13.5108 9.01842 13.1221C8.98184 13.1113 8.94446 13.1008 8.90709 13.0898L4.73619 11.8623C4.52085 11.7989 4.31413 11.7254 4.11608 11.6445L4.01354 12.8398C3.83585 14.9004 3.71024 16.3723 3.76061 17.4941C3.8102 18.5984 4.02814 19.237 4.43444 19.7061C4.83485 20.1683 5.40086 20.4455 6.41979 20.5947C7.46526 20.7478 8.85799 20.75 10.8241 20.75H13.1756C15.1415 20.75 16.5335 20.7477 17.579 20.5947C18.5982 20.4455 19.1648 20.1684 19.5653 19.7061C19.9716 19.237 20.1895 18.5984 20.2391 17.4941C20.2895 16.3724 20.1639 14.9004 19.9862 12.8398L19.8827 11.6445ZM5.42662 6.75C4.67248 6.75 4.42438 6.75474 4.24596 6.7959C3.66107 6.93096 3.32734 7.30741 3.2567 7.65039C3.2379 7.74181 3.24506 7.88508 3.32311 8.53613C3.38859 9.08201 3.56446 9.4427 3.82213 9.71094C4.0909 9.99071 4.50817 10.2309 5.16002 10.4229L9.33092 11.6514C10.7965 12.0828 11.3906 12.25 11.9989 12.25C12.6073 12.25 13.202 12.0829 14.6678 11.6514L18.8387 10.4229C19.4905 10.231 19.9079 9.99068 20.1766 9.71094C20.4342 9.44274 20.6092 9.08181 20.6747 8.53613C20.7527 7.88486 20.7599 7.7418 20.7411 7.65039C20.6704 7.30733 20.3369 6.93088 19.7518 6.7959C19.5734 6.75475 19.3253 6.75 18.5712 6.75H5.42662ZM11.8963 3.25C11.2684 3.25 10.8692 3.25167 10.5672 3.29102C10.2912 3.32703 10.1738 3.38599 10.0887 3.45606C9.99517 3.53313 9.89225 3.66441 9.76158 3.98535C9.63953 4.2852 9.52071 4.68135 9.35436 5.25H14.6434C14.4771 4.68141 14.3592 4.28518 14.2372 3.98535C14.1065 3.66427 14.0026 3.53314 13.909 3.45606C13.824 3.38609 13.7072 3.327 13.4315 3.29102C13.1294 3.25161 12.7299 3.25 12.1014 3.25H11.8963Z" fill="currentColor" />
    </svg>
  )
}

function AwardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1.25C16.55 1.25 20.25 4.95 20.25 9.5C20.25 11.8209 19.2854 13.9186 17.7383 15.4189L18.29 18.0596C18.77 20.3696 19.0096 21.5298 18.3096 22.2998C18.0196 22.6197 17.6893 22.7598 17.3193 22.7598C16.6194 22.7596 15.7592 22.2896 14.6494 21.6797L12.3799 20.4395C12.2001 20.3396 12.0202 20.2397 11.96 20.2295C11.9799 20.2495 11.7996 20.3397 11.6396 20.4297L9.34961 21.6797C7.64964 22.6097 6.52944 23.2298 5.68945 22.2998C4.98954 21.5298 5.22998 20.3693 5.70996 18.0693L6.26074 15.4189C4.71391 13.9187 3.75 11.8206 3.75 9.5C3.75 4.95 7.45 1.25 12 1.25ZM7.17969 18.3701C6.90971 19.65 6.60982 21.0901 6.7998 21.29C6.96993 21.2699 7.84996 20.7893 8.62988 20.3594L10.8994 19.1201C11.3394 18.8801 11.62 18.7295 12 18.7295C12.3799 18.7296 12.6602 18.8794 13.0801 19.1094L15.3701 20.3594C16.1496 20.7891 17.0387 21.2694 17.2793 21.25C17.3893 21.08 17.0893 19.6499 16.8193 18.3799L16.4199 16.4609C15.1413 17.2755 13.6256 17.75 12 17.75C10.3736 17.75 8.85713 17.2753 7.57812 16.46L7.17969 18.3701ZM12 2.75C8.28 2.75 5.25 5.78 5.25 9.5C5.25 13.22 8.28 16.25 12 16.25C15.72 16.25 18.75 13.22 18.75 9.5C18.75 5.78 15.72 2.75 12 2.75ZM14.7695 6.78027C15.1695 6.66029 15.5899 6.87966 15.71 7.26953C15.83 7.66953 15.6097 8.08996 15.2197 8.20996C13.6797 8.68998 11.7296 11.0597 11.0996 11.9297C10.9596 12.1297 10.7293 12.2402 10.4893 12.2402L10.5 12.25C10.5 12.25 10.4702 12.25 10.46 12.25C10.2 12.24 9.96964 12.09 9.84961 11.8701C9.36021 11.0012 8.95041 10.9203 8.93945 10.9102C8.52971 10.91 8.21991 10.5799 8.21973 10.1602C8.21973 9.74016 8.59 9.41016 9 9.41016C9.15053 9.41022 9.80996 9.46071 10.5195 10.2402C11.4195 9.1503 13.1196 7.3004 14.7695 6.78027Z" fill="currentColor" />
    </svg>
  )
}

function ExperienceIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M16.5211 3.43556C17.1356 3.12072 17.8575 3.21601 18.3775 3.65724C18.5994 3.84564 18.741 4.09239 18.8492 4.31349C18.9578 4.53559 19.0743 4.8225 19.2105 5.15724L22.6949 13.7178C22.6967 13.7223 22.698 13.727 22.6998 13.7315C22.7027 13.7392 22.7049 13.7471 22.7076 13.7549C22.7234 13.8004 22.7331 13.8465 22.7398 13.8926C22.7442 13.9232 22.746 13.9536 22.7466 13.9844C22.7469 13.9965 22.748 14.0085 22.7476 14.0205C22.7465 14.0632 22.7424 14.1055 22.734 14.1475C22.7324 14.1554 22.7299 14.1631 22.7281 14.1709C22.7198 14.2061 22.7092 14.2405 22.6959 14.2744C22.6925 14.283 22.6888 14.2914 22.6851 14.2998C22.668 14.3391 22.6487 14.3777 22.6246 14.4141L22.6236 14.417L22.2037 15.0459C21.9443 15.4349 21.8787 15.5409 21.8365 15.6485C21.812 15.7107 21.7921 15.7755 21.7779 15.8408C21.7535 15.9537 21.7496 16.0786 21.7496 16.5459V16.583C21.7496 17.2317 21.7499 17.773 21.7066 18.2119C21.6613 18.6712 21.5623 19.0983 21.3131 19.4863C21.0998 19.8182 20.8178 20.1003 20.4859 20.3135C20.098 20.5626 19.6715 20.6617 19.2125 20.707C18.7735 20.7504 18.2314 20.75 17.5826 20.75H16.4742C16.0299 20.75 15.6586 20.7503 15.3541 20.7295C15.0373 20.7079 14.738 20.6611 14.4478 20.541C13.7741 20.262 13.2387 19.7264 12.9595 19.0528C12.8393 18.7624 12.7927 18.4626 12.7711 18.1455C12.7503 17.8409 12.7496 17.4698 12.7496 17.0254V16.9746C12.7496 16.5985 12.7536 16.2752 12.7662 16H12.7496C12.7496 15.5858 12.4138 15.25 11.9996 15.25C11.5855 15.2502 11.2496 15.5859 11.2496 16H11.234C11.2465 16.2752 11.2496 16.5985 11.2496 16.9746V17.0254C11.2496 17.4698 11.2499 17.8409 11.2291 18.1455C11.2074 18.4626 11.1609 18.7624 11.0406 19.0528C10.7615 19.7265 10.226 20.262 9.55231 20.541C9.26193 20.6613 8.96217 20.7079 8.64508 20.7295C8.3405 20.7503 7.96936 20.75 7.52497 20.75H6.41657C5.76791 20.75 5.22657 20.7504 4.78766 20.707C4.32844 20.6617 3.90127 20.5628 3.51325 20.3135C3.18145 20.1003 2.89928 19.8182 2.6861 19.4863C2.43686 19.0983 2.33884 18.6711 2.29352 18.2119C2.25022 17.773 2.24956 17.2317 2.24958 16.583V16.5459C2.24958 16.0785 2.24571 15.9537 2.22126 15.8408C2.20706 15.7755 2.1881 15.7107 2.16364 15.6485C2.12138 15.5409 2.05504 15.4353 1.79547 15.0459L1.37555 14.416C1.35044 14.3783 1.32971 14.3386 1.31208 14.2979C1.30958 14.2921 1.30759 14.2861 1.30524 14.2803C1.29006 14.2427 1.27795 14.2042 1.26911 14.1651C1.26778 14.1592 1.26639 14.1534 1.2652 14.1475C1.25679 14.1056 1.25172 14.0632 1.25055 14.0205C1.25022 14.0085 1.25128 13.9965 1.25153 13.9844C1.2522 13.952 1.25447 13.9198 1.25934 13.8877C1.26432 13.8551 1.27038 13.8224 1.27985 13.7901L1.29645 13.7403C1.29767 13.737 1.2991 13.7338 1.30036 13.7305C1.30199 13.7263 1.30353 13.722 1.30524 13.7178L4.78962 5.15724C4.92583 4.82253 5.0423 4.53558 5.15094 4.31349C5.25914 4.09238 5.40069 3.84563 5.62262 3.65724C6.14262 3.21601 6.86453 3.12072 7.47907 3.43556C7.7423 3.57048 7.93436 3.78398 8.08454 3.97463C8.23553 4.16633 8.40733 4.419 8.60602 4.71193L8.62067 4.73439C8.85287 5.07702 8.76383 5.54286 8.42145 5.77541C8.07872 6.00789 7.61202 5.91884 7.37946 5.57619C7.16178 5.25528 7.02058 5.04786 6.9068 4.90334C6.83335 4.81007 6.79413 4.77394 6.78376 4.76466C6.72758 4.74024 6.66306 4.74392 6.59919 4.79494C6.59363 4.80229 6.5605 4.84619 6.4986 4.97267C6.41529 5.14297 6.31731 5.38153 6.16852 5.74709L3.11579 13.25H7.52497C7.96937 13.25 8.3405 13.2497 8.64508 13.2705C8.96217 13.2922 9.26193 13.3387 9.55231 13.459C9.96514 13.63 10.3252 13.8981 10.607 14.2344C10.9902 13.9317 11.4734 13.7501 11.9996 13.75C12.5257 13.75 13.009 13.9318 13.3922 14.2344C13.674 13.898 14.0349 13.63 14.4478 13.459C14.738 13.3389 15.0373 13.2922 15.3541 13.2705C15.6586 13.2497 16.0299 13.25 16.4742 13.25H20.8843L17.8316 5.74709C17.6828 5.38153 17.5848 5.14297 17.5015 4.97267C17.4396 4.8461 17.4065 4.80228 17.4009 4.79494C17.3371 4.74388 17.2725 4.74031 17.2164 4.76466C17.206 4.77394 17.1668 4.81007 17.0933 4.90334C16.9795 5.04786 16.8384 5.25521 16.6207 5.57619C16.3881 5.91891 15.9214 6.00792 15.5787 5.77541C15.2362 5.54287 15.1472 5.07708 15.3795 4.73439C15.3844 4.72703 15.3892 4.71924 15.3941 4.71193C15.5928 4.41901 15.7646 4.16633 15.9156 3.97463C16.0658 3.78397 16.2578 3.57045 16.5211 3.43556ZM3.38825 14.75C3.45523 14.8662 3.51207 14.9807 3.55915 15.1006C3.61292 15.2375 3.65587 15.3787 3.68708 15.5225C3.74997 15.8124 3.74977 16.1073 3.74958 16.4815C3.74957 16.5026 3.74958 16.5243 3.74958 16.5459C3.74958 17.2411 3.75056 17.708 3.78571 18.0645C3.81972 18.4091 3.87979 18.5699 3.94782 18.6758C4.04469 18.8266 4.17304 18.9549 4.3238 19.0518C4.42971 19.1198 4.59044 19.1799 4.93512 19.2139C5.29162 19.2491 5.75842 19.25 6.45368 19.25H7.49958C7.97578 19.25 8.29606 19.2493 8.54352 19.2324C8.78371 19.216 8.90098 19.1872 8.97809 19.1553C9.28436 19.0284 9.52798 18.7848 9.65485 18.4785C9.68681 18.4014 9.71655 18.2837 9.73298 18.043C9.74984 17.7956 9.74958 17.476 9.74958 17C9.74958 16.524 9.74984 16.2045 9.73298 15.957C9.71655 15.7163 9.68681 15.5987 9.65485 15.5215C9.52797 15.2153 9.28435 14.9716 8.97809 14.8447C8.90098 14.8128 8.7837 14.784 8.54352 14.7676C8.29606 14.7507 7.97578 14.75 7.49958 14.75H3.38825ZM16.4996 14.75C16.0235 14.75 15.704 14.7507 15.4566 14.7676C15.2159 14.784 15.0982 14.8128 15.0211 14.8447C14.715 14.9716 14.4721 15.2154 14.3453 15.5215C14.3133 15.5987 14.2836 15.7163 14.2672 15.957C14.2503 16.2045 14.2496 16.524 14.2496 17C14.2496 17.476 14.2503 17.7956 14.2672 18.043C14.2836 18.2837 14.3133 18.4014 14.3453 18.4785C14.4721 18.7846 14.715 19.0284 15.0211 19.1553C15.0982 19.1872 15.2159 19.216 15.4566 19.2324C15.704 19.2493 16.0235 19.25 16.4996 19.25H17.5455C18.241 19.25 18.7084 19.2491 19.065 19.2139C19.4093 19.1799 19.5695 19.1198 19.6754 19.0518C19.8262 18.9549 19.9544 18.8266 20.0513 18.6758C20.1194 18.5699 20.1794 18.4092 20.2134 18.0645C20.2486 17.708 20.2496 17.2412 20.2496 16.5459C20.2496 16.5243 20.2496 16.5026 20.2496 16.4815C20.2494 16.1074 20.2492 15.8123 20.3121 15.5225C20.3433 15.3788 20.3863 15.2375 20.44 15.1006C20.4871 14.9807 20.5449 14.8662 20.6119 14.75H16.4996Z" fill="currentColor" />
    </svg>
  )
}

function CloseSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function EditPencilIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.0148 8.20598L8.52849 14.6923C7.7215 15.4995 7.22751 15.9936 6.62029 16.3329C6.28159 16.5221 5.76784 16.6867 5.24236 16.8329C4.97199 16.9082 4.68133 16.983 4.38396 17.0566L3.48552 17.2734L3.47771 17.2753C3.26681 17.3254 3.04514 17.2625 2.89177 17.1093C2.7383 16.9558 2.67548 16.7335 2.72576 16.5224L2.72673 16.5155C2.86816 15.9215 3.01666 15.2986 3.16716 14.7577C3.31343 14.2321 3.47891 13.7184 3.66814 13.3798C4.00744 12.7727 4.50071 12.2795 5.30779 11.4726L11.7951 4.98528L15.0148 8.20598ZM14.1662 15.6259C14.6264 15.6259 15.0002 15.9987 15.0002 16.4589C15.0002 16.9191 14.6264 17.2919 14.1662 17.2919H9.16618C8.70617 17.2917 8.33319 16.919 8.33318 16.4589C8.33318 15.9988 8.70617 15.6262 9.16618 15.6259H14.1662ZM13.4045 3.3759C14.2937 2.48668 15.7359 2.48668 16.6252 3.3759C17.514 4.26502 17.5139 5.70646 16.6252 6.59563L15.8986 7.32219L12.6789 4.10149L13.4045 3.3759Z" fill="currentColor"/>
    </svg>
  )
}

function LeerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.7725 2.26657C11.9248 2.24448 12.0753 2.24448 12.2276 2.26657C13.7896 2.49323 15.6905 3.25556 17.4258 4.09078C19.1786 4.9344 20.8337 5.88767 21.9249 6.54586C23.0252 7.20965 23.0252 8.79027 21.9249 9.45407C21.7192 9.5781 21.4926 9.7112 21.2501 9.85348V16.3457L22.6251 19.5478C23.0627 20.5677 22.306 21.75 21.1719 21.75H19.8292C18.6951 21.75 17.9383 20.5677 18.376 19.5478L19.7501 16.3457V10.706C19.4181 10.8884 19.0726 11.0752 18.7169 11.2607L17.7403 17.123C17.7099 17.3053 17.6131 17.4705 17.4688 17.5859L17.4649 17.5888C17.4392 17.6087 17.375 17.6591 17.337 17.6875C17.2565 17.7476 17.14 17.8316 16.9942 17.9316C16.7033 18.1311 16.2891 18.3965 15.7911 18.6621C14.8114 19.1846 13.4312 19.75 12.0001 19.75C10.5691 19.7499 9.18965 19.1845 8.21002 18.6621C7.71183 18.3964 7.2969 18.1311 7.00592 17.9316C6.86038 17.8318 6.74461 17.7476 6.66412 17.6875C6.62567 17.6588 6.56031 17.6083 6.53522 17.5888L6.53229 17.5859C6.3881 17.4705 6.29117 17.3052 6.2608 17.123L5.28326 11.2607C4.02809 10.6063 2.89316 9.94742 2.07525 9.45407C0.974915 8.79027 0.974915 7.20965 2.07525 6.54586C3.16644 5.88767 4.82156 4.9344 6.57428 4.09078C8.30961 3.25556 10.2105 2.49323 11.7725 2.26657ZM19.754 20.1396C19.7499 20.1495 19.7453 20.1743 19.7686 20.2099C19.7795 20.2265 19.792 20.2375 19.8018 20.2431C19.8097 20.2476 19.8176 20.25 19.8292 20.25H21.1719C21.1835 20.25 21.1914 20.2476 21.1993 20.2431C21.2091 20.2375 21.2216 20.2265 21.2325 20.2099C21.2558 20.1743 21.2512 20.1495 21.2471 20.1396L20.5001 18.4013L19.754 20.1396ZM17.0596 12.08C15.426 12.8456 13.6809 13.5225 12.2276 13.7334C12.0753 13.7555 11.9248 13.7555 11.7725 13.7334C10.3193 13.5225 8.574 12.8465 6.94049 12.081L7.69049 16.5791C7.73808 16.6131 7.79239 16.6523 7.85358 16.6943C8.10945 16.8698 8.47697 17.1037 8.91608 17.3379C9.81134 17.8153 10.9313 18.2499 12.0001 18.25C13.0689 18.25 14.1897 17.8154 15.085 17.3379C15.5239 17.1037 15.8908 16.8697 16.1465 16.6943C16.2078 16.6523 16.262 16.6132 16.3096 16.5791L17.0596 12.08ZM11.9874 3.75094C10.6645 3.94298 8.9371 4.61863 7.22565 5.44235C5.53147 6.25777 3.91975 7.18458 2.84967 7.83004C2.71651 7.91056 2.71651 8.08937 2.84967 8.16989C3.91975 8.81535 5.53147 9.74216 7.22565 10.5576C8.9371 11.3813 10.6645 12.0569 11.9874 12.249C11.9969 12.2504 12.0032 12.2504 12.0128 12.249C13.3357 12.0569 15.063 11.3813 16.7745 10.5576C18.4687 9.74216 20.0804 8.81535 21.1504 8.16989C21.2836 8.08937 21.2836 7.91056 21.1504 7.83004C20.0804 7.18458 18.4687 6.25777 16.7745 5.44235C15.063 4.61863 13.3357 3.94298 12.0128 3.75094C12.0032 3.74955 11.9969 3.74955 11.9874 3.75094Z" fill="currentColor" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ---- Suggested experience tags ---- */
const SUGGESTED_ERVARING = [
  'Dementie', 'Diabetes', 'Mobiliteitsproblemen', 'Parkinson',
  'NAH (niet-aangeboren hersenletsel)', 'Autisme', 'ADHD',
  'Depressie', 'Angststoornissen', 'Schizofrenie',
  'COPD', 'Hartfalen', 'Revalidatie', 'Palliatieve zorg',
  'Wondzorg', 'Stomazorg', 'Medicatiebeheer',
  'Verstandelijke beperking', 'Lichamelijke beperking',
  'Ouderenzorg', 'Jeugdzorg', 'GGZ',
  'Huishoudelijke hulp', 'Persoonlijke verzorging',
  'Begeleiding', 'Dagbesteding',
]

/* ---- Modal popup for add/edit entries ---- */
function EntryModal({ entry, fields, onSave, onCancel, title }) {
  const [form, setForm] = useState(entry || fields.reduce((acc, f) => ({ ...acc, [f.key]: '' }), {}))

  return (
    <div className="cv-edit__modal-overlay" onClick={onCancel}>
      <div className="cv-edit__modal" onClick={e => e.stopPropagation()}>
        <h2 className="cv-edit__modal-title">{title}</h2>
        {fields.map(f => (
          <div key={f.key} className="cv-edit__form-field">
            <label className="cv-edit__form-label">{f.label}</label>
            <input
              className="cv-edit__form-input"
              type="text"
              value={form[f.key]}
              onChange={e => setForm({ ...form, [f.key]: e.target.value })}
              placeholder={f.placeholder}
            />
          </div>
        ))}
        <div className="cv-edit__modal-actions">
          <button className="cv-edit__btn cv-edit__btn--secondary" onClick={onCancel}>Annuleren</button>
          <button
            className="cv-edit__btn cv-edit__btn--primary"
            onClick={() => onSave(form)}
            disabled={!fields.some(f => form[f.key].trim())}
          >
            Opslaan
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---- Leerbereidheid edit popup ---- */
function LeerPopup({ value, onSave, onCancel }) {
  const [text, setText] = useState(value || '')

  return (
    <div className="cv-edit__modal-overlay" onClick={onCancel}>
      <div className="cv-edit__modal" onClick={e => e.stopPropagation()}>
        <h2 className="cv-edit__modal-title">Leerbereidheid bewerken</h2>
        <textarea
          className="cv-edit__textarea"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Beschrijf je bereidheid om bij te leren, bijv. trainingen die je wilt volgen..."
          rows={4}
          autoFocus
        />
        <div className="cv-edit__modal-actions">
          <button className="cv-edit__btn cv-edit__btn--secondary" onClick={onCancel}>Annuleren</button>
          <button className="cv-edit__btn cv-edit__btn--primary" onClick={() => onSave(text)}>Opslaan</button>
        </div>
      </div>
    </div>
  )
}

/* ---- Section component for list-based sections ---- */
function ListSection({ icon, title, items, fields, metaKey, onUpdate, addLabel, editTitle, addTitle }) {
  const [modal, setModal] = useState(null) // null | { idx: number | 'new', entry? }
  const [deleteConfirm, setDeleteConfirm] = useState(null) // null | { idx, titel }

  const handleSave = (formData) => {
    if (modal.idx === 'new') {
      onUpdate([...items, formData])
    } else {
      onUpdate(items.map((item, i) => i === modal.idx ? formData : item))
    }
    setModal(null)
  }

  const handleDelete = (idx) => {
    setDeleteConfirm({ idx, titel: items[idx].titel })
  }

  const confirmDelete = () => {
    onUpdate(items.filter((_, i) => i !== deleteConfirm.idx))
    setDeleteConfirm(null)
  }

  return (
    <div className="cv-edit__section">
      <div className="cv-edit__section-header">
        <span className="cv-edit__section-icon">{icon}</span>
        <span className="cv-edit__section-title">{title}</span>
      </div>

      {items.map((item, idx) => (
        <div key={idx} className="cv-edit__entry" onClick={() => setModal({ idx, entry: item })}>
          <div className="cv-edit__entry-content">
            <span className="cv-edit__entry-title">{item.titel}</span>
            <span className="cv-edit__entry-meta">{item.periode} &middot; {item[metaKey]}</span>
          </div>
          <button
            className="cv-edit__entry-delete"
            onClick={e => { e.stopPropagation(); handleDelete(idx) }}
            aria-label={`Verwijder ${item.titel}`}
          >
            <CloseSmallIcon />
          </button>
        </div>
      ))}

      <button className="cv-edit__add-btn" onClick={() => setModal({ idx: 'new' })}>
        <PlusIcon /> {addLabel || 'Voeg toe'}
      </button>

      {modal && (
        <EntryModal
          entry={modal.entry}
          fields={fields}
          title={modal.idx === 'new' ? (addTitle || 'Toevoegen') : (editTitle || 'Bewerken')}
          onSave={handleSave}
          onCancel={() => setModal(null)}
        />
      )}

      {deleteConfirm && (
        <div className="cv-edit__modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="cv-edit__modal" onClick={e => e.stopPropagation()}>
            <h2 className="cv-edit__modal-title">Verwijderen</h2>
            <p className="cv-edit__modal-desc">Weet je zeker dat je dit item wilt verwijderen? Dit kan niet ongedaan worden gemaakt.</p>
            <div className="cv-edit__modal-actions">
              <button className="cv-edit__btn cv-edit__btn--secondary" onClick={() => setDeleteConfirm(null)}>Annuleren</button>
              <button className="cv-edit__btn cv-edit__btn--primary" onClick={confirmDelete}>Verwijderen</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ---- Ervaring met full-screen sub-page ---- */
function ErvaringMetPage({ items, onUpdate, onBack }) {
  const toggleTag = (tag) => {
    if (items.includes(tag)) {
      onUpdate(items.filter(t => t !== tag))
    } else {
      onUpdate([...items, tag])
    }
  }

  return (
    <div className="cv-edit cv-edit--ervaring">
      <header className="cv-edit__header">
        <button className="cv-edit__back" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="cv-edit__title">Ervaring met</h1>
      </header>

      <div className="cv-edit__body">
        <p className="cv-edit__intro">
          Selecteer waar je ervaring mee hebt.
        </p>

        <div className="cv-edit__ervaring-grid">
          {SUGGESTED_ERVARING.map(tag => {
            const active = items.includes(tag)
            return (
              <button
                key={tag}
                className={`cv-edit__ervaring-pill${active ? ' cv-edit__ervaring-pill--active' : ''}`}
                onClick={() => toggleTag(tag)}
                aria-pressed={active}
              >
                {active && <CheckIcon />}
                {tag}
              </button>
            )
          })}
          {/* Show custom tags not in the suggested list */}
          {items.filter(t => !SUGGESTED_ERVARING.includes(t)).map(tag => (
            <button
              key={tag}
              className="cv-edit__ervaring-pill cv-edit__ervaring-pill--active"
              onClick={() => toggleTag(tag)}
              aria-pressed={true}
            >
              <CheckIcon />
              {tag}
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

/* ---- Main CvBewerken page ---- */
export default function CvBewerken({ onBack, cv, onCvChange }) {
  const [showErvaringPage, setShowErvaringPage] = useState(false)
  const [showLeerPopup, setShowLeerPopup] = useState(false)

  const updateSection = (key, value) => {
    onCvChange({ ...cv, [key]: value })
  }

  // Sub-page: Ervaring met
  if (showErvaringPage) {
    return (
      <ErvaringMetPage
        items={cv.ervaringMet}
        onUpdate={val => updateSection('ervaringMet', val)}
        onBack={() => setShowErvaringPage(false)}
      />
    )
  }

  return (
    <div className="cv-edit">
      <header className="cv-edit__header">
        <button className="cv-edit__back" onClick={onBack} aria-label="Terug">
          <BackArrowIcon />
        </button>
        <h1 className="cv-edit__title">Mijn CV</h1>
      </header>

      <div className="cv-edit__body">
        <p className="cv-edit__intro">
          Vul je CV aan zodat zorgvragers een beter beeld krijgen van jouw ervaring en achtergrond.
        </p>

        <div className="cv-edit__card">
          <ListSection
            icon={<GraduationIcon />}
            title="Opleidingen"
            items={cv.opleidingen}
            fields={[
              { key: 'titel', label: 'Opleiding', placeholder: 'Bijv. Helpende Zorg en Welzijn' },
              { key: 'periode', label: 'Periode', placeholder: 'Bijv. 2020 - 2023' },
              { key: 'instituut', label: 'Instituut', placeholder: 'Bijv. ROC Amsterdam' },
            ]}
            metaKey="instituut"
            addLabel="Voeg opleiding toe"
            addTitle="Opleiding toevoegen"
            editTitle="Opleiding bewerken"
            onUpdate={val => updateSection('opleidingen', val)}
          />

          <ListSection
            icon={<BriefcaseIcon />}
            title="Werkervaring"
            items={cv.werkervaring}
            fields={[
              { key: 'titel', label: 'Functie', placeholder: 'Bijv. Zorghulp' },
              { key: 'periode', label: 'Periode', placeholder: 'Bijv. 2021 - Huidig' },
              { key: 'bedrijf', label: 'Bedrijf', placeholder: 'Bijv. Zelfstandig' },
            ]}
            metaKey="bedrijf"
            addLabel="Voeg werkervaring toe"
            addTitle="Werkervaring toevoegen"
            editTitle="Werkervaring bewerken"
            onUpdate={val => updateSection('werkervaring', val)}
          />

          <ListSection
            icon={<AwardIcon />}
            title="Certificaten"
            items={cv.certificaten}
            fields={[
              { key: 'titel', label: 'Certificaat', placeholder: 'Bijv. EHBO' },
              { key: 'periode', label: 'Geldigheid', placeholder: 'Bijv. 2022 - 2025' },
              { key: 'instituut', label: 'Instituut', placeholder: 'Bijv. Het Oranje Kruis' },
            ]}
            metaKey="instituut"
            addLabel="Voeg certificaat toe"
            addTitle="Certificaat toevoegen"
            editTitle="Certificaat bewerken"
            onUpdate={val => updateSection('certificaten', val)}
          />

          {/* Ervaring met — navigates to sub-page */}
          <div className="cv-edit__section">
            <div className="cv-edit__section-header">
              <span className="cv-edit__section-icon"><ExperienceIcon /></span>
              <span className="cv-edit__section-title">Ervaring met</span>
            </div>

            <div className="cv-edit__tags">
              {cv.ervaringMet.map((tag, idx) => (
                <span key={idx} className="cv-edit__tag">{tag}</span>
              ))}
            </div>

            <button className="cv-edit__add-btn" onClick={() => setShowErvaringPage(true)}>
              <EditPencilIcon /> Bewerk ervaring
            </button>
          </div>
        </div>

        {/* Leerbereidheid — read-only with edit button */}
        <div className="cv-edit__card">
          <div className="cv-edit__section cv-edit__section--last">
            <div className="cv-edit__section-header">
              <span className="cv-edit__section-icon"><LeerIcon /></span>
              <span className="cv-edit__section-title">Leerbereidheid</span>
            </div>
            <p className="cv-edit__leerbereidheid-text">
              {cv.leerbereidheid || <span className="cv-edit__placeholder">Nog niet ingevuld — beschrijf je leerbereidheid.</span>}
            </p>
            <div className="cv-edit__divider" />
            <button className="cv-edit__add-btn" onClick={() => setShowLeerPopup(true)}>
              <EditPencilIcon /> Bewerk leerbereidheid
            </button>
          </div>
        </div>
      </div>

      {showLeerPopup && (
        <LeerPopup
          value={cv.leerbereidheid}
          onSave={text => { updateSection('leerbereidheid', text); setShowLeerPopup(false) }}
          onCancel={() => setShowLeerPopup(false)}
        />
      )}
    </div>
  )
}
