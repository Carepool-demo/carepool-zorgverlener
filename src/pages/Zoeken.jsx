import { useState } from 'react'
import { BackArrowIcon, ChevronDownIcon, LocationOutlineIcon, CertificateIcon } from '../components/Icons'
import { zoekenResultaten } from '../data/dummyData'
import './Zoeken.css'

/* ---- Page-specific icons ---- */

/* hold-01.svg from Iconen/Mijn Carepool */
function CareHandIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.83337 2.33325L7.83351 3.33298V6.66658C7.83351 6.94273 7.60966 7.16658 7.33351 7.16658C7.05737 7.16658 6.83351 6.94273 6.83351 6.66658V3.33346C6.83332 3.05749 6.60954 2.83368 6.33351 2.83368C6.05737 2.83368 5.83351 3.05754 5.83351 3.33368L5.83337 8.97489C5.83337 9.17726 5.71138 9.35967 5.52435 9.43697C5.33732 9.51426 5.12214 9.4712 4.97927 9.32787L3.89907 8.24428C3.63608 7.98046 3.20336 8.00428 2.97072 8.296C2.79316 8.51864 2.78727 8.83352 2.95591 9.06265L5.35179 12.1231C5.8946 12.8165 6.16671 13.8367 6.16671 14.6667C6.16671 14.9428 5.94285 15.1667 5.66671 15.1667C5.39056 15.1667 5.16671 14.9428 5.16671 14.6667C5.16671 14.007 4.93987 13.2192 4.56438 12.7395L2.16459 9.67407L2.15784 9.66526C1.71394 9.07153 1.72667 8.25209 2.1889 7.6725C2.79368 6.91414 3.92236 6.85121 4.60728 7.53828L4.8334 7.76512L4.83351 3.33368C4.83352 2.50526 5.50509 1.83368 6.33351 1.83368C6.52855 1.83368 6.71489 1.8709 6.88582 1.93863C7.05906 1.30165 7.64152 0.833252 8.33337 0.833252C9.13478 0.833252 9.78939 1.46172 9.83125 2.25269C9.98824 2.19694 10.1573 2.16658 10.3334 2.16658C11.1348 2.16658 11.7894 2.79505 11.8312 3.58603C11.9882 3.53027 12.1573 3.49992 12.3334 3.49992C13.1618 3.49992 13.8334 4.17147 13.8334 4.99987V9.12834C13.8334 9.83821 13.8334 10.3947 13.8048 10.8449C13.7757 11.3029 13.7156 11.6847 13.5796 12.0399C13.4155 12.469 13.0183 12.9573 12.7529 13.2603C12.5889 13.4476 12.5 13.6718 12.5 13.8903V14.6667C12.5 14.9428 12.2762 15.1667 12 15.1667C11.7239 15.1667 11.5 14.9428 11.5 14.6667V13.8903C11.5 13.3998 11.6976 12.9475 12.0007 12.6014C12.2754 12.2877 12.5538 11.9227 12.6457 11.6826C12.7304 11.4611 12.7807 11.1923 12.8068 10.7815C12.8331 10.3668 12.8334 9.84194 12.8334 9.11114V4.99996C12.8334 4.72382 12.6095 4.49992 12.3334 4.49992C12.0572 4.49992 11.8334 4.72378 11.8334 4.99992V7.99992C11.8334 8.27606 11.6095 8.49992 11.3334 8.49992C11.0572 8.49992 10.8334 8.27606 10.8334 7.99992V3.66658C10.8334 3.39044 10.6095 3.16658 10.3334 3.16658C10.0572 3.16658 9.83337 3.39044 9.83337 3.66658V7.33325C9.83337 7.60939 9.60952 7.83325 9.33337 7.83325C9.05723 7.83325 8.83337 7.60939 8.83337 7.33325V2.33325C8.83337 2.05711 8.60952 1.83325 8.33337 1.83325C8.05725 1.83325 7.83341 2.05714 7.83337 2.33325Z" fill="currentColor"/>
    </svg>
  )
}

/* filter-horizontal.svg from Iconen/Mijn Carepool */
function FilterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5215 11.042C12.8915 11.042 13.2004 11.0413 13.4541 11.0586C13.7182 11.0766 13.9681 11.1157 14.21 11.2158C14.7714 11.4484 15.2176 11.8947 15.4502 12.4561C15.5504 12.698 15.5894 12.9478 15.6074 13.2119C15.6101 13.2508 15.6104 13.2915 15.6123 13.333H17.5C17.9602 13.333 18.333 13.7068 18.333 14.167C18.3328 14.6271 17.9601 15 17.5 15H15.6123C15.6104 15.0417 15.6101 15.0821 15.6074 15.1211C15.5894 15.3853 15.5504 15.635 15.4502 15.877C15.2176 16.4384 14.7714 16.8846 14.21 17.1172C13.9681 17.2173 13.7182 17.2564 13.4541 17.2744C13.2004 17.2917 12.8915 17.292 12.5215 17.292H12.4785C12.1085 17.292 11.7996 17.2917 11.5459 17.2744C11.2818 17.2564 11.0319 17.2173 10.79 17.1172C10.2286 16.8846 9.78241 16.4384 9.5498 15.877C9.44957 15.635 9.41061 15.3853 9.39258 15.1211C9.37526 14.8673 9.37499 14.5579 9.375 14.1875V14.1455C9.37499 13.7752 9.37526 13.4657 9.39258 13.2119C9.41062 12.9478 9.44961 12.698 9.5498 12.4561C9.78244 11.8947 10.2286 11.4484 10.79 11.2158C11.0319 11.1157 11.2818 11.0766 11.5459 11.0586C11.7996 11.0413 12.1085 11.042 12.4785 11.042H12.5215ZM7.5 13.333C7.96024 13.333 8.33301 13.7068 8.33301 14.167C8.33283 14.6271 7.96013 15 7.5 15H2.5C2.03987 15 1.66717 14.6271 1.66699 14.167C1.66699 13.7068 2.03976 13.333 2.5 13.333H7.5ZM7.52148 2.70801C7.89149 2.708 8.20043 2.7083 8.4541 2.72559C8.71825 2.74361 8.96806 2.78267 9.20996 2.88281C9.77145 3.11539 10.2176 3.56157 10.4502 4.12305C10.5504 4.36504 10.5894 4.61466 10.6074 4.87891C10.6247 5.13274 10.625 5.44213 10.625 5.8125V5.85449C10.625 6.22483 10.6247 6.53427 10.6074 6.78809C10.5894 7.05223 10.5504 7.30205 10.4502 7.54395C10.2176 8.10529 9.77136 8.55164 9.20996 8.78418C8.9681 8.88429 8.7182 8.92339 8.4541 8.94141C8.20043 8.95869 7.89148 8.95801 7.52148 8.95801H7.47852C7.10852 8.95801 6.79957 8.95869 6.5459 8.94141C6.2818 8.92339 6.0319 8.88429 5.79004 8.78418C5.22864 8.55164 4.78244 8.10529 4.5498 7.54395C4.44961 7.30205 4.41062 7.05223 4.39258 6.78809C4.38992 6.74916 4.3896 6.70855 4.3877 6.66699H2.5C2.03976 6.66699 1.66699 6.29325 1.66699 5.83301C1.66717 5.37292 2.03987 5 2.5 5H4.3877C4.3896 4.95834 4.38992 4.91793 4.39258 4.87891C4.41061 4.61466 4.44957 4.36504 4.5498 4.12305C4.78241 3.56157 5.22855 3.11539 5.79004 2.88281C6.03194 2.78267 6.28175 2.74361 6.5459 2.72559C6.79957 2.7083 7.10851 2.708 7.47852 2.70801H7.52148ZM17.5 5C17.9601 5 18.3328 5.37292 18.333 5.83301C18.333 6.29325 17.9602 6.66699 17.5 6.66699H12.5C12.0398 6.66699 11.667 6.29325 11.667 5.83301C11.6672 5.37292 12.0399 5 12.5 5H17.5Z" fill="currentColor"/>
    </svg>
  )
}

/* briefcase-02.svg in 24px focus-color circle */
function IndividualCareIcon() {
  return (
    <span className="zoeken__care-badge">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.1611 8.43164C14.2282 8.39241 14.3156 8.43526 14.3222 8.5127C14.4367 9.84038 14.527 10.8868 14.4902 11.708C14.4525 12.5486 14.2801 13.2373 13.7988 13.793C13.3135 14.3532 12.667 14.6031 11.8633 14.7207C11.0855 14.8345 10.0842 14.834 8.8242 14.834H7.17381C5.91359 14.834 4.91157 14.8346 4.13377 14.7207C3.33018 14.603 2.68443 14.3531 2.1992 13.793C1.71778 13.2372 1.54457 12.5487 1.50682 11.708C1.46999 10.8868 1.56029 9.84035 1.67479 8.5127C1.68147 8.43523 1.76879 8.3924 1.83592 8.43164C2.16855 8.62611 2.52294 8.76479 2.874 8.86817C3.19354 8.96224 3.51343 9.05637 3.83299 9.15039C4.49638 9.34559 5.15996 9.5407 5.82322 9.73633C6.61826 9.97082 7.28589 10.168 7.999 10.168C8.71207 10.1679 9.37978 9.97081 10.1748 9.73633C10.838 9.5407 11.5016 9.34558 12.165 9.15039C12.4844 9.05642 12.8037 8.96219 13.123 8.86817C13.4741 8.76482 13.8285 8.62605 14.1611 8.43164ZM8.10545 1C8.47912 0.999962 8.82085 1.00001 9.10545 1.03711C9.42251 1.07848 9.7339 1.17226 10.0146 1.40332C10.2878 1.62833 10.4496 1.91565 10.5722 2.2168C10.6877 2.50037 10.7926 2.85922 10.9131 3.27246L10.9844 3.5H12.4472C12.8565 3.49985 13.1472 3.50009 13.3926 3.55664C14.0793 3.71506 14.6655 4.20868 14.8076 4.89844C14.8577 5.14155 14.8241 5.41696 14.7851 5.73828C14.721 6.26977 14.5495 6.77394 14.1719 7.16699C13.8296 7.52311 13.3723 7.752 12.8418 7.90821L9.98729 8.74805C9.10751 9.00718 8.56671 9.16692 7.99998 9.16699C7.43317 9.16699 6.8925 9.0072 6.01268 8.74805L3.15721 7.90821C2.62669 7.75199 2.16931 7.52313 1.82713 7.16699C1.44953 6.77394 1.27802 6.26977 1.21385 5.73828C1.17491 5.41696 1.14229 5.14155 1.19236 4.89844C1.33448 4.20875 1.91975 3.71505 2.60643 3.55664C2.85178 3.50005 3.14237 3.49985 3.55174 3.5H5.02147C5.04328 3.42416 5.0648 3.34823 5.08689 3.27246C5.2074 2.85922 5.31229 2.50037 5.42772 2.2168C5.55033 1.91567 5.71123 1.62831 5.98436 1.40332C6.26521 1.17198 6.57727 1.0785 6.89451 1.03711C7.1791 1.00002 7.52088 0.999962 7.89451 1C7.96483 1.00001 8.03552 1.00001 8.10545 1ZM7.93162 2.33301C7.50833 2.33301 7.2545 2.33483 7.06639 2.35938C6.82708 2.39067 6.75227 2.49819 6.66209 2.71973C6.58751 2.90294 6.51509 3.14547 6.41111 3.5H9.58885C9.48487 3.14545 9.41148 2.90295 9.33689 2.71973C9.24678 2.49843 9.17267 2.39068 8.93357 2.35938C8.74548 2.33484 8.49155 2.33301 8.06834 2.33301H7.93162Z" fill="currentColor"/>
      </svg>
    </span>
  )
}

/* location-01-filled.svg for top sheet */
function LocationFilledIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0.833008C11.5897 0.833008 14.4998 3.74331 14.5 7.33301C14.5 9.89002 12.8596 11.851 11.3203 13.1338C10.5423 13.7821 9.76648 14.2774 9.18652 14.6104C8.89597 14.7772 8.65299 14.9045 8.48145 14.9902C8.3957 15.0331 8.32762 15.0656 8.28027 15.0879C8.25822 15.0983 8.22146 15.115 8.20605 15.1221L8.20312 15.124C8.07391 15.1814 7.92609 15.1804 7.79688 15.123L7.79297 15.1221C7.74218 15.0982 7.60224 15.0321 7.51855 14.9902C7.34701 14.9045 7.10403 14.7772 6.81348 14.6104C6.23352 14.2774 5.4577 13.7821 4.67969 13.1338C3.14037 11.851 1.5 9.89002 1.5 7.33301C1.50018 3.74331 4.41026 0.833008 8 0.833008ZM8 4.66699C6.52735 4.66699 5.33318 5.8604 5.33301 7.33301C5.33301 8.80577 6.52724 10 8 10C9.47276 10 10.667 8.80577 10.667 7.33301C10.6668 5.8604 9.47265 4.66699 8 4.66699Z" fill="currentColor"/>
    </svg>
  )
}

/* arrow-reload-horizontal.svg for top sheet schedule row */
function RepeatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M17.4993 9.16681C17.9595 9.16681 18.3323 9.53963 18.3324 9.99981C18.3324 13.6478 15.6283 16.2498 12.0824 16.2498H5.41634V17.4959C5.41722 17.6689 5.36372 17.844 5.25325 17.994C4.9803 18.3644 4.45875 18.4436 4.08821 18.1707L4.08528 18.1688C4.02242 18.1213 3.8444 17.987 3.74446 17.909C3.54218 17.7511 3.26941 17.5325 2.99446 17.2938C2.72363 17.0586 2.43167 16.7868 2.20052 16.5252C2.08581 16.3954 1.96844 16.248 1.87532 16.0936C1.79597 15.9619 1.6664 15.7172 1.66634 15.4168C1.66634 15.1161 1.79596 14.8707 1.87532 14.7391C1.96845 14.5846 2.08583 14.4372 2.20052 14.3074C2.43159 14.0459 2.72374 13.7749 2.99446 13.5399C3.26943 13.3011 3.54217 13.0825 3.74446 12.9246C3.84432 12.8467 4.02232 12.7124 4.08528 12.6649L4.08821 12.6619C4.45863 12.3892 4.98026 12.4685 5.25325 12.8387C5.36287 12.9875 5.41639 13.1611 5.41634 13.3328V14.5828H12.0824C14.7252 14.5828 16.6663 12.7101 16.6663 9.99981C16.6664 9.53963 17.0391 9.16681 17.4993 9.16681ZM14.7454 2.00567C15.0184 1.63525 15.54 1.55603 15.9105 1.82892L15.9134 1.83087C15.9763 1.87841 16.1543 2.01367 16.2542 2.09161C16.4565 2.24947 16.7293 2.46815 17.0042 2.70685C17.275 2.94193 17.5671 3.21292 17.7982 3.47442C17.9129 3.60427 18.0302 3.75155 18.1234 3.90606C18.2027 4.03766 18.3322 4.28236 18.3324 4.58282C18.3324 4.88353 18.2027 5.12892 18.1234 5.26056C18.0302 5.41505 17.9129 5.56236 17.7982 5.6922C17.5671 5.9537 17.275 6.22471 17.0042 6.45978C16.7293 6.69849 16.4565 6.91715 16.2542 7.07501C16.1542 7.15308 15.9761 7.28843 15.9134 7.33575L15.9105 7.33771C15.54 7.6105 15.0184 7.53123 14.7454 7.16095C14.6372 7.01403 14.5837 6.84314 14.5824 6.67364V5.41681H7.91634C5.27354 5.41681 3.3324 7.2896 3.33235 9.99981C3.33235 10.4601 2.95958 10.8328 2.49934 10.8328C2.03911 10.8328 1.66634 10.4601 1.66634 9.99981C1.66639 6.35187 4.37041 3.74981 7.91634 3.74981H14.5824V2.49981C14.5822 2.32801 14.6357 2.15462 14.7454 2.00567Z" fill="currentColor"/>
    </svg>
  )
}

/* user-group.svg in 24px focus-color circle */
function GroupCareIcon() {
  return (
    <span className="zoeken__care-badge">
      <svg width="14" height="13" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.6389 19.2979C14.2885 17.1231 18.9171 17.1231 22.5667 19.2979C22.6742 19.3619 22.8106 19.4382 22.9671 19.5264C23.6758 19.926 24.8018 20.5604 25.5696 21.3125C26.0517 21.7848 26.5326 22.4289 26.6204 23.2314C26.7142 24.0903 26.3352 24.8862 25.6135 25.5742C24.4215 26.7106 22.9449 27.6659 21.009 27.666H12.1965C10.2607 27.6659 8.78404 26.7106 7.59205 25.5742C6.87042 24.8862 6.49238 24.0903 6.58619 23.2314C6.67403 22.4289 7.15486 21.7848 7.63698 21.3125C8.40472 20.5606 9.52988 19.926 10.2385 19.5264C10.395 19.4382 10.5314 19.3619 10.6389 19.2979ZM3.55592 17.7373C5.60005 16.4178 8.03823 16.0284 10.3147 16.5693C10.8511 16.6968 11.1191 16.7607 11.1428 16.9424C11.1662 17.124 10.9046 17.2599 10.3811 17.5303C9.98414 17.7353 9.59483 17.9497 9.30885 18.1201C8.62452 18.5057 7.33568 19.2325 6.40455 20.1445C5.80366 20.7332 5.01354 21.7117 4.86647 23.0576C4.82113 23.473 4.84109 23.8712 4.9153 24.249C4.98955 24.6269 5.02701 24.8167 4.92799 24.916C4.82868 25.0151 4.66286 24.9909 4.33229 24.9424C2.91588 24.7346 1.95768 23.991 1.17213 23.1797C0.584903 22.5732 0.281724 21.875 0.356702 21.1289C0.427347 20.4282 0.816612 19.8637 1.20533 19.4512C1.81888 18.8001 2.72327 18.2484 3.2649 17.918C3.38057 17.8474 3.47971 17.7865 3.55592 17.7373ZM22.8919 16.5693C25.1682 16.0285 27.6057 16.4179 29.6497 17.7373C29.7259 17.7865 29.826 17.8474 29.9417 17.918C30.4834 18.2485 31.3879 18.8003 32.0012 19.4512C32.3899 19.8637 32.7783 20.4284 32.8489 21.1289C32.9239 21.875 32.6207 22.5731 32.0335 23.1797C31.248 23.9909 30.2905 24.7346 28.8743 24.9424C28.5435 24.9909 28.3779 25.015 28.2786 24.916C28.1793 24.8168 28.216 24.6271 28.2903 24.249C28.3645 23.8712 28.3854 23.473 28.3401 23.0576C28.1931 21.7118 27.4029 20.7332 26.802 20.1445C25.871 19.2325 24.5821 18.5057 23.8977 18.1201C23.6117 17.9497 23.2217 17.7354 22.8245 17.5303C22.3011 17.2599 22.0394 17.124 22.0628 16.9424C22.0865 16.7606 22.3553 16.6969 22.8919 16.5693ZM8.30104 7C8.53023 7 8.75588 7.01695 8.97584 7.04883C9.23801 7.08683 9.36939 7.10593 9.43678 7.21094C9.50366 7.31594 9.45735 7.45581 9.36354 7.73438C9.1233 8.44783 8.99342 9.20938 8.99342 10C8.9935 11.6531 9.56106 13.1788 10.5188 14.4053C10.7013 14.639 10.7921 14.7566 10.7639 14.877C10.7355 14.9969 10.6184 15.0566 10.384 15.1748C9.76142 15.4889 9.05254 15.667 8.30104 15.667C5.81777 15.6669 3.80513 13.7261 3.80494 11.333C3.80513 8.93996 5.81777 7.00006 8.30104 7ZM24.9046 7C27.3879 7 29.4014 8.93992 29.4016 11.333C29.4014 13.7261 27.3879 15.667 24.9046 15.667C24.1531 15.667 23.4441 15.4889 22.8215 15.1748C22.5872 15.0566 22.4701 14.9969 22.4417 14.877C22.4135 14.7566 22.5052 14.6391 22.6878 14.4053C23.6454 13.1789 24.2131 11.653 24.2131 10C24.2131 9.20946 24.0832 8.44777 23.843 7.73438C23.7492 7.4559 23.702 7.31593 23.7688 7.21094C23.8362 7.10588 23.9683 7.08686 24.2307 7.04883C24.4505 7.01699 24.6755 7.00001 24.9046 7ZM16.6028 4.33301C19.8503 4.33309 22.4827 6.87044 22.4827 10C22.4825 13.1294 19.8502 15.6659 16.6028 15.666C13.3553 15.666 10.7221 13.1295 10.7219 10C10.7219 6.87039 13.3552 4.33301 16.6028 4.33301Z" fill="currentColor"/>
      </svg>
    </span>
  )
}

/* cancel-01.svg — close/X icon */
function CancelIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.0773 2.74403C12.4028 2.41859 12.9306 2.41859 13.256 2.74403C13.5815 3.06947 13.5815 3.59731 13.256 3.92274L9.17889 7.99989L13.256 12.077C13.5815 12.4025 13.5814 12.9303 13.256 13.2558C12.9306 13.5812 12.4028 13.5812 12.0773 13.2558L8.00018 9.1786L3.92303 13.2558C3.5976 13.5812 3.06976 13.5812 2.74432 13.2558C2.41888 12.9303 2.41888 12.4025 2.74432 12.077L6.82147 7.99989L2.74432 3.92274C2.41888 3.59731 2.41888 3.06947 2.74432 2.74403C3.06976 2.41865 3.59761 2.41861 3.92303 2.74403L8.00018 6.82118L12.0773 2.74403Z" fill="currentColor"/>
    </svg>
  )
}

/* euro.svg — tarief icon */
function EuroIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.03881 6.00001C4.34276 3.40747 6.3955 1.33334 8.97432 1.33334C10.8109 1.33334 12.3919 2.39616 13.2492 3.93757C13.4282 4.25934 13.3124 4.66526 12.9907 4.84423C12.6689 5.0232 12.263 4.90744 12.084 4.58567C11.4338 3.41663 10.2717 2.66668 8.97432 2.66668C7.21048 2.66668 5.67486 4.07314 5.38309 6.00001H8.66663C9.03482 6.00001 9.33329 6.29849 9.33329 6.66668C9.33329 7.03487 9.03482 7.33334 8.66663 7.33334H5.33329V8.66668H8.66663C9.03482 8.66668 9.33329 8.96515 9.33329 9.33334C9.33329 9.70153 9.03482 10 8.66663 10H5.38309C5.67486 11.9269 7.21048 13.3333 8.97432 13.3333C10.2717 13.3333 11.4338 12.5834 12.084 11.4144C12.263 11.0926 12.6689 10.9768 12.9907 11.1558C13.3124 11.3348 13.4282 11.7407 13.2492 12.0625C12.3919 13.6039 10.8109 14.6667 8.97432 14.6667C6.3955 14.6667 4.34276 12.5926 4.03881 10H3.33329C2.9651 10 2.66663 9.70153 2.66663 9.33334C2.66663 8.96515 2.9651 8.66668 3.33329 8.66668H3.99996V7.33334H3.33329C2.9651 7.33334 2.66663 7.03487 2.66663 6.66668C2.66663 6.29849 2.9651 6.00001 3.33329 6.00001H4.03881Z" fill="currentColor"/>
    </svg>
  )
}

/* user.svg — zorgverlener profiel icon */
function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.28333 13.1888C8.44248 11.3077 12.4464 11.3077 15.6056 13.1888C15.709 13.2504 15.837 13.3221 15.9816 13.4037C16.6151 13.7611 17.5725 14.3016 18.2286 14.9437C18.639 15.3454 19.0288 15.8753 19.0997 16.5238C19.175 17.2133 18.8741 17.86 18.2706 18.4349C17.2295 19.4268 15.9804 20.2219 14.3644 20.222H6.52552C4.90924 20.222 3.65958 19.4269 2.61829 18.4349C2.01493 17.8601 1.71396 17.2132 1.78919 16.5238C1.86008 15.8753 2.24991 15.3454 2.66028 14.9437C3.31643 14.3015 4.27473 13.7611 4.90833 13.4037C5.05262 13.3223 5.18009 13.2503 5.28333 13.1888ZM10.4445 1.11072C13.0218 1.11072 15.1114 3.20043 15.1115 5.77771C15.1115 8.35503 13.0218 10.4447 10.4445 10.4447C7.86722 10.4446 5.77747 8.355 5.77747 5.77771C5.77753 3.20047 7.86725 1.11078 10.4445 1.11072Z" fill="currentColor"/>
    </svg>
  )
}

/* mortarboard-01.svg — diploma icon */
function MortarboardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M11.7725 2.26657C11.9248 2.24448 12.0753 2.24448 12.2276 2.26657C13.7896 2.49323 15.6905 3.25556 17.4258 4.09078C19.1786 4.9344 20.8337 5.88767 21.9249 6.54586C23.0252 7.20965 23.0252 8.79027 21.9249 9.45407C21.7192 9.5781 21.4926 9.7112 21.2501 9.85348V16.3457L22.6251 19.5478C23.0627 20.5677 22.306 21.75 21.1719 21.75H19.8292C18.6951 21.75 17.9383 20.5677 18.376 19.5478L19.7501 16.3457V10.706C19.4181 10.8884 19.0726 11.0752 18.7169 11.2607L17.7403 17.123C17.7099 17.3053 17.6131 17.4705 17.4688 17.5859L17.4649 17.5888C17.4392 17.6087 17.375 17.6591 17.337 17.6875C17.2565 17.7476 17.14 17.8316 16.9942 17.9316C16.7033 18.1311 16.2891 18.3965 15.7911 18.6621C14.8114 19.1846 13.4312 19.75 12.0001 19.75C10.5691 19.7499 9.18965 19.1845 8.21002 18.6621C7.71183 18.3964 7.2969 18.1311 7.00592 17.9316C6.86038 17.8318 6.74461 17.7476 6.66412 17.6875C6.62567 17.6588 6.56031 17.6083 6.53522 17.5888L6.53229 17.5859C6.3881 17.4705 6.29117 17.3052 6.2608 17.123L5.28326 11.2607C4.02809 10.6063 2.89316 9.94742 2.07525 9.45407C0.974915 8.79027 0.974915 7.20965 2.07525 6.54586C3.16644 5.88767 4.82156 4.9344 6.57428 4.09078C8.30961 3.25556 10.2105 2.49323 11.7725 2.26657ZM19.754 20.1396C19.7499 20.1495 19.7453 20.1743 19.7686 20.2099C19.7795 20.2265 19.792 20.2375 19.8018 20.2431C19.8097 20.2476 19.8176 20.25 19.8292 20.25H21.1719C21.1835 20.25 21.1914 20.2476 21.1993 20.2431C21.2091 20.2375 21.2216 20.2265 21.2325 20.2099C21.2558 20.1743 21.2512 20.1495 21.2471 20.1396L20.5001 18.4013L19.754 20.1396ZM17.0596 12.08C15.426 12.8456 13.6809 13.5225 12.2276 13.7334C12.0753 13.7555 11.9248 13.7555 11.7725 13.7334C10.3193 13.5225 8.574 12.8465 6.94049 12.081L7.69049 16.5791C7.73808 16.6131 7.79239 16.6523 7.85358 16.6943C8.10945 16.8698 8.47697 17.1037 8.91608 17.3379C9.81134 17.8153 10.9313 18.2499 12.0001 18.25C13.0689 18.25 14.1897 17.8154 15.085 17.3379C15.5239 17.1037 15.8908 16.8697 16.1465 16.6943C16.2078 16.6523 16.262 16.6132 16.3096 16.5791L17.0596 12.08ZM11.9874 3.75094C10.6645 3.94298 8.9371 4.61863 7.22565 5.44235C5.53147 6.25777 3.91975 7.18458 2.84967 7.83004C2.71651 7.91056 2.71651 8.08937 2.84967 8.16989C3.91975 8.81535 5.53147 9.74216 7.22565 10.5576C8.9371 11.3813 10.6645 12.0569 11.9874 12.249C11.9969 12.2504 12.0032 12.2504 12.0128 12.249C13.3357 12.0569 15.063 11.3813 16.7745 10.5576C18.4687 9.74216 20.0804 8.81535 21.1504 8.16989C21.2836 8.08937 21.2836 7.91056 21.1504 7.83004C20.0804 7.18458 18.4687 6.25777 16.7745 5.44235C15.063 4.61863 13.3357 3.94298 12.0128 3.75094C12.0032 3.74955 11.9969 3.74955 11.9874 3.75094Z" fill="currentColor"/>
    </svg>
  )
}

/* thumbs-up.svg — voorkeuren icon */
function ThumbsUpIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.666 2.65418C11.275 2.1243 12.2105 2.18095 12.7471 2.78797C12.8414 2.90617 13.059 3.19388 13.1729 3.3993C13.6976 4.26624 13.8574 5.29907 13.6162 6.28015C13.5893 6.38972 13.5547 6.50053 13.502 6.67078L13.2744 7.40711C13.1799 7.71251 13.122 7.89988 13.0928 8.03992C13.0711 8.11729 13.0825 8.27341 13.2998 8.28308C13.4499 8.29647 14.0381 8.29676 14.3662 8.29676C15.3972 8.29674 16.2343 8.29703 16.874 8.38172C17.528 8.46829 18.122 8.65922 18.5264 9.1659C18.6062 9.26597 18.6776 9.37316 18.7393 9.48523C19.0554 10.0599 18.9883 10.6795 18.7979 11.3026C18.6125 11.9088 18.2656 12.6557 17.8408 13.5702C17.4466 14.419 17.0964 15.1727 16.7832 15.7011C16.4592 16.2475 16.1125 16.677 15.6338 17.0038C15.0729 17.3866 14.3247 17.5867 13.6846 17.6483C13.0639 17.708 12.3018 17.7089 11.3457 17.7089C10.1925 17.7089 8.76282 17.708 8.03418 17.6132C7.28035 17.515 6.64487 17.3057 6.13867 16.8153C6.01844 16.6988 5.91545 16.5741 5.8252 16.4432C5.25989 17.2105 4.3693 17.7088 3.36328 17.7089C2.08119 17.7089 1.04199 16.6356 1.04199 15.3124V10.5214C1.04199 9.19818 2.08119 8.12488 3.36328 8.12488C4.15053 8.12493 4.86689 8.43092 5.41309 8.93055C5.43005 8.87841 5.4459 8.82566 5.46582 8.7743C5.7233 8.11047 6.20943 7.57324 6.95605 6.74695L10.4648 2.86121C10.5311 2.78776 10.5988 2.71267 10.666 2.65418ZM3.36328 9.72254C2.93592 9.72254 2.58887 10.0803 2.58887 10.5214V15.3124C2.58887 15.7534 2.93592 16.1112 3.36328 16.1112C4.21792 16.1111 4.91113 15.3956 4.91113 14.5136V11.3192C4.91097 10.4373 4.21782 9.72264 3.36328 9.72254Z" fill="currentColor"/>
    </svg>
  )
}

/* add-01.svg — plus icon for filter rows */
function AddIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4.5C12.4142 4.5 12.75 4.83579 12.75 5.25V11.25H18.75C19.1642 11.25 19.5 11.5858 19.5 12C19.5 12.4142 19.1642 12.75 18.75 12.75H12.75V18.75C12.75 19.1642 12.4142 19.5 12 19.5C11.5858 19.5 11.25 19.1642 11.25 18.75V12.75H5.25C4.83579 12.75 4.5 12.4142 4.5 12C4.5 11.5858 4.83579 11.25 5.25 11.25H11.25V5.25C11.25 4.83579 11.5858 4.5 12 4.5Z" fill="currentColor"/>
    </svg>
  )
}

/* info-circle.svg — tooltip info icon */
function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5ZM0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8ZM8 5C8.41421 5 8.75 4.66421 8.75 4.25C8.75 3.83579 8.41421 3.5 8 3.5C7.58579 3.5 7.25 3.83579 7.25 4.25C7.25 4.66421 7.58579 5 8 5ZM8 6.25C8.41421 6.25 8.75 6.58579 8.75 7V11.5C8.75 11.9142 8.41421 12.25 8 12.25C7.58579 12.25 7.25 11.9142 7.25 11.5V7C7.25 6.58579 7.58579 6.25 8 6.25Z" fill="currentColor"/>
    </svg>
  )
}

/* Small calendar icon for date input */
function CalendarSmallIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2V4M6 2V4M3 8H21M5 4H19C20.1046 4 21 4.89543 21 6V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* Zorg category labels */
const zorgLabels = {
  persoonlijkeVerzorging: 'Persoonlijke verzorging',
  verpleging: 'Verpleging',
  huishoudelijkeHulp: 'Huishoudelijke hulp',
  begeleidingIndividueel: 'Begeleiding individueel',
}

function Zoeken({ onBack, onSelectResult }) {
  const [showTopSheet, setShowTopSheet] = useState(false)
  const [activeBottomSheet, setActiveBottomSheet] = useState(null)
  const [showFilter, setShowFilter] = useState(false)
  const [expandedFilters, setExpandedFilters] = useState({})
  const [expandedSubFilters, setExpandedSubFilters] = useState({})
  const [filterSelections, setFilterSelections] = useState({
    geslacht: [],
    typeZorgverlener: [],
    leeftijd: [],
    taal: [],
    ervaringZorg: [],
    diploma: [],
    ervaringMet: [],
    certCertificaten: [],
    certRegistraties: [],
    roken: [],
    vervoer: [],
    huisdieren: [],
    hygiene: [],
    specifiekeWensen: [],
  })
  const [tariefMin, setTariefMin] = useState(0)
  const [tariefMax, setTariefMax] = useState(100)

  /* Bottom sheet state */
  const [afstand, setAfstand] = useState(10)
  const [wanneerMode, setWanneerMode] = useState('terugkerend')
  const [selectedDays, setSelectedDays] = useState(['di', 'do'])
  const [zorgToggles, setZorgToggles] = useState({
    persoonlijkeVerzorging: true,
    verpleging: false,
    huishoudelijkeHulp: true,
    begeleidingIndividueel: false,
  })

  const toggleDay = (day) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    )
  }

  const toggleZorg = (key) => {
    setZorgToggles(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const openBottomSheet = (sheet) => {
    setActiveBottomSheet(sheet)
  }

  const closeBottomSheet = () => {
    setActiveBottomSheet(null)
  }

  const profielSubCategories = [
    { key: 'typeZorgverlener', label: 'Type zorgverlener', options: ['Formeel', 'Informeel', 'Vrijwilliger'] },
    { key: 'geslacht', label: 'Geslacht', options: ['Man', 'Vrouw', 'Non-binair'] },
    { key: 'leeftijd', label: 'Leeftijd', options: ['18-30 jaar', '31-40 jaar', '41-55 jaar', '56+ jaar'] },
    { key: 'taal', label: 'Taal', options: ['Nederlands', 'Engels'] },
  ]

  const ervaringSubCategories = [
    { key: 'ervaringZorg', label: 'Ervaring in de zorg', options: ['0-3 jaar (Starter)', '3-7 jaar (Ervaren)', '7+ jaar (Expert)'] },
    { key: 'diploma', label: 'Diploma', options: ['Geen', 'MBO', 'HBO'] },
    { key: 'ervaringMet', label: 'Ervaring met', options: ['Cerebrale parese (CP)', 'Dwarsleasie', 'Multiple Sclerose (MS)', 'Spina bifida', 'Duchenne', 'Autisme Spectrum Stoornis (ASS)', 'Niet-aangeboren hersenletsel (NAH/CVA)', 'Downsyndroom', 'Dementie/ouderenzorg'] },
  ]

  const certificatenSubCategories = [
    { key: 'certCertificaten', label: 'Certificaten', options: ['BHV en/of EHBO', 'Reanimatie & AED', 'Tracheacanule verzorging', 'Medicijnbeheer', 'Agressiehantering en De-escalatie', 'Positieve Gedragsondersteuning (PBS)', 'Tillen en verplaatsen (transfer)', 'Autisme begeleiding', 'Epilepsie', 'Blaas- en darmzorg', 'Sondevoeding', 'Wondverzorging', 'Diabetes', 'Decubituspreventie'] },
    { key: 'certRegistraties', label: 'Registraties', options: ['AGB', 'KVK', 'BIG', 'Registerplein', 'Wmo kennisplein'] },
  ]

  const voorkeurenSubCategories = [
    { key: 'roken', label: 'Roken', options: ['Heeft geen bezwaar tegen roken', 'Rookt niet'] },
    { key: 'vervoer', label: 'Vervoer', options: ['Beschikt over rijbewijs', 'Beschikt over eigen vervoer', 'Is bereid tot vervoeren', 'Is bereid tot vervoer begeleiden'] },
    { key: 'huisdieren', label: 'Huisdieren', options: ['Heeft huisdieren', 'Heeft geen bezwaar tegen huisdieren'] },
    { key: 'hygiene', label: 'Hygiëne', options: ['Werkt alleen met handschoenen', 'Bereid tot het afdoen van sieraden', 'Bereid tot het verwijderen van nepnagels'] },
  ]

  const specifiekeWensenOptions = [
    'Alleen met gezamelijke connecties',
    'Flexibel in taken',
    'Loyaal',
    'Werkt graag in teams',
  ]

  const profielPills = [
    ...filterSelections.geslacht,
    ...filterSelections.typeZorgverlener,
    ...filterSelections.leeftijd,
    ...filterSelections.taal,
  ]

  const ervaringPills = [
    ...filterSelections.ervaringZorg,
    ...filterSelections.diploma,
    ...filterSelections.ervaringMet,
  ]

  const certificatenPills = [
    ...filterSelections.certCertificaten,
    ...filterSelections.certRegistraties,
  ]

  const voorkeurenPills = [
    ...filterSelections.roken,
    ...filterSelections.vervoer,
    ...filterSelections.huisdieren,
    ...filterSelections.hygiene,
  ]

  const specifiekeWensenPills = filterSelections.specifiekeWensen

  const tariefPills = (tariefMin !== 0 || tariefMax !== 100)
    ? [`€ ${tariefMin} - € ${tariefMax}`]
    : []

  const toggleFilterExpand = (key) => {
    if (expandedFilters[key]) {
      setExpandedSubFilters({})
    }
    setExpandedFilters(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleSubFilterExpand = (key) => {
    setExpandedSubFilters(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleFilterOption = (category, option) => {
    setFilterSelections(prev => ({
      ...prev,
      [category]: prev[category].includes(option)
        ? prev[category].filter(o => o !== option)
        : [...prev[category], option]
    }))
  }

  const resetFilters = () => {
    setExpandedFilters({})
    setExpandedSubFilters({})
    setFilterSelections(prev => {
      const reset = {}
      Object.keys(prev).forEach(k => { reset[k] = [] })
      return reset
    })
    setTariefMin(0)
    setTariefMax(100)
  }

  /* Helper: render a multi-level expandable filter row */
  const renderExpandableFilter = (filterKey, icon, label, subCategories, pills) => (
    <div className={`zoeken__filter-row zoeken__filter-row--expandable${expandedFilters[filterKey] || pills.length > 0 ? ' zoeken__filter-row--expanded' : ''}`}>
      <button
        className="zoeken__filter-row-header"
        onClick={() => toggleFilterExpand(filterKey)}
      >
        <span className="zoeken__filter-row-icon">{icon}</span>
        <span className="zoeken__filter-row-label">{label}</span>
        <span className={`zoeken__filter-row-action${expandedFilters[filterKey] ? ' zoeken__filter-row-action--close' : ''}`}>
          {expandedFilters[filterKey] ? <CancelIcon /> : <AddIcon />}
        </span>
      </button>
      {expandedFilters[filterKey] && (
        <div className="zoeken__filter-sub">
          {subCategories.map(sub => (
            <div key={sub.key} className="zoeken__filter-sub-group">
              <button
                className="zoeken__filter-sub-row"
                onClick={() => toggleSubFilterExpand(sub.key)}
              >
                <span className="zoeken__filter-sub-label">{sub.label}</span>
                <span className="zoeken__filter-sub-action">
                  {expandedSubFilters[sub.key] ? <CancelIcon /> : <AddIcon />}
                </span>
              </button>
              {expandedSubFilters[sub.key] && (
                <div className="zoeken__filter-options">
                  {sub.options.map(option => (
                    <button
                      key={option}
                      className="zoeken__filter-option"
                      onClick={() => toggleFilterOption(sub.key, option)}
                    >
                      <span className={`zoeken__filter-option-box${filterSelections[sub.key]?.includes(option) ? ' zoeken__filter-option-box--checked' : ''}`} />
                      <span className="zoeken__filter-option-label">{option}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {!expandedFilters[filterKey] && pills.length > 0 && (
        <div className="zoeken__filter-pills">
          {pills.map(option => (
            <span key={option} className="zoeken__filter-pill zoeken__filter-pill--selected">
              {option}
            </span>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="zoeken">
      {/* Header area */}
      <header className="zoeken__header">
        <div
          className="zoeken__header-card"
          onClick={() => setShowTopSheet(true)}
          role="button"
          tabIndex={0}
          aria-label="Zoekcriteria aanpassen"
        >
          <div className="zoeken__header-top">
            <button className="zoeken__back" onClick={(e) => { e.stopPropagation(); onBack(); }} aria-label="Terug">
              <BackArrowIcon />
            </button>
            <span className="zoeken__postcode">1098 WC</span>
          </div>
          <div className="zoeken__header-tags">
            <CareHandIcon />
            <span className="zoeken__care-types">Persoonlijke verzorging, Huisho...</span>
            <span className="zoeken__care-count">+2</span>
          </div>
        </div>

        {/* Filter bar */}
        <div className="zoeken__filter-bar">
          <button
            className="zoeken__filter-btn"
            onClick={() => setShowFilter(true)}
            aria-label="Filter"
          >
            <FilterIcon />
            Filter
          </button>
          <button
            className="zoeken__sort-btn"
            onClick={() => alert('Sorteer op (nog niet geïmplementeerd)')}
            aria-label="Sorteer op"
          >
            Sorteer op
            <ChevronDownIcon />
          </button>
        </div>
      </header>

      {/* Results count */}
      <p className="zoeken__results-count">
        {zoekenResultaten.length} zorgverleners in jouw buurt
      </p>

      {/* Results list */}
      <div className="zoeken__list">
        {zoekenResultaten.map((result) => (
          <button
            key={result.id}
            className="zoeken__card"
            onClick={() => onSelectResult ? onSelectResult(result) : alert(`${result.name} (nog niet geïmplementeerd)`)}
            aria-label={`Bekijk profiel van ${result.name}`}
          >
            <div className="zoeken__card-avatar">
              {result.initials}
            </div>
            <div className="zoeken__card-content">
              <div className="zoeken__card-top">
                <span className="zoeken__card-name">{result.name}</span>
                <span className="zoeken__card-age">{result.age} jr</span>
                {result.careTypes.length > 0 && (
                  <span className="zoeken__card-icons">
                    {result.careTypes.map((type) => (
                      <span key={type} className="zoeken__card-care-icon">
                        {type === 'individual' ? <IndividualCareIcon /> : <GroupCareIcon />}
                      </span>
                    ))}
                  </span>
                )}
                <span className="zoeken__card-distance">
                  <LocationOutlineIcon size={12} />
                  {result.distance}
                </span>
              </div>
              <p className="zoeken__card-bio">{result.bio}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Filter overlay */}
      {showFilter && (
        <div className="zoeken__filter-overlay">
          <div className="zoeken__filter-header">
            <button
              className="zoeken__filter-close"
              onClick={() => setShowFilter(false)}
              aria-label="Sluiten"
            >
              <CancelIcon />
            </button>
            <span className="zoeken__filter-title">Filter</span>
            <button
              className="zoeken__filter-reset"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>

          <div className="zoeken__filter-list">
            {/* ---- Tarief (bruto) ---- */}
            <div className={`zoeken__filter-row zoeken__filter-row--expandable${expandedFilters.tarief ? ' zoeken__filter-row--expanded' : ''}`}>
              <button
                className="zoeken__filter-row-header"
                onClick={() => toggleFilterExpand('tarief')}
              >
                <span className="zoeken__filter-row-icon"><EuroIcon /></span>
                <span className="zoeken__filter-row-label">Tarief (bruto)</span>
                <span className={`zoeken__filter-row-action${expandedFilters.tarief ? ' zoeken__filter-row-action--close' : ''}`}>
                  {expandedFilters.tarief ? <CancelIcon /> : <AddIcon />}
                </span>
              </button>
              {expandedFilters.tarief && (
                <div className="zoeken__filter-tarief">
                  <div className="zoeken__filter-tarief-values">
                    <div className="zoeken__filter-tarief-box">€ {tariefMin}</div>
                    <div className="zoeken__filter-tarief-box">€ {tariefMax}</div>
                  </div>
                  <div className="zoeken__filter-tarief-track">
                    <div
                      className="zoeken__filter-tarief-fill"
                      style={{ left: `${tariefMin}%`, width: `${tariefMax - tariefMin}%` }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={tariefMin}
                      className="zoeken__filter-tarief-input"
                      onChange={e => setTariefMin(Math.min(Number(e.target.value), tariefMax - 5))}
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={tariefMax}
                      className="zoeken__filter-tarief-input"
                      onChange={e => setTariefMax(Math.max(Number(e.target.value), tariefMin + 5))}
                    />
                  </div>
                  <div className="zoeken__filter-tarief-labels">
                    <span>€ 0</span>
                    <span>€ 100</span>
                  </div>
                  <div className="zoeken__filter-tarief-help">
                    <span>Welk tarief past bij mij zorg?</span>
                    <InfoIcon />
                  </div>
                </div>
              )}
              {!expandedFilters.tarief && tariefPills.length > 0 && (
                <div className="zoeken__filter-pills">
                  {tariefPills.map(p => (
                    <span key={p} className="zoeken__filter-pill zoeken__filter-pill--selected">{p}</span>
                  ))}
                </div>
              )}
            </div>

            {/* ---- Zorgverlener profiel ---- */}
            {renderExpandableFilter('profiel', <UserIcon />, 'Zorgverlener profiel', profielSubCategories, profielPills)}

            {/* ---- Diploma's en werkervaring ---- */}
            {renderExpandableFilter('ervaring', <MortarboardIcon />, "Diploma's en werkervaring", ervaringSubCategories, ervaringPills)}

            {/* ---- Certificaten en registraties ---- */}
            {renderExpandableFilter('certificaten', <CertificateIcon />, 'Certificaten en registraties', certificatenSubCategories, certificatenPills)}

            {/* ---- Voorkeuren ---- */}
            {renderExpandableFilter('voorkeuren', <ThumbsUpIcon />, 'Voorkeuren', voorkeurenSubCategories, voorkeurenPills)}

            {/* ---- Specifieke wensen ---- */}
            <div className={`zoeken__filter-row zoeken__filter-row--expandable zoeken__filter-row--plain${expandedFilters.specifiek || specifiekeWensenPills.length > 0 ? ' zoeken__filter-row--expanded' : ''}`}>
              <button
                className="zoeken__filter-row-header"
                onClick={() => toggleFilterExpand('specifiek')}
              >
                <span className="zoeken__filter-row-label">Specifieke wensen</span>
                <span className={`zoeken__filter-row-action${expandedFilters.specifiek ? ' zoeken__filter-row-action--close' : ''}`}>
                  {expandedFilters.specifiek ? <CancelIcon /> : <AddIcon />}
                </span>
              </button>
              {expandedFilters.specifiek && (
                <div className="zoeken__filter-options zoeken__filter-options--direct">
                  {specifiekeWensenOptions.map(option => (
                    <button
                      key={option}
                      className="zoeken__filter-option"
                      onClick={() => toggleFilterOption('specifiekeWensen', option)}
                    >
                      <span className={`zoeken__filter-option-box${filterSelections.specifiekeWensen.includes(option) ? ' zoeken__filter-option-box--checked' : ''}`} />
                      <span className="zoeken__filter-option-label">{option}</span>
                    </button>
                  ))}
                </div>
              )}
              {!expandedFilters.specifiek && specifiekeWensenPills.length > 0 && (
                <div className="zoeken__filter-pills">
                  {specifiekeWensenPills.map(option => (
                    <span key={option} className="zoeken__filter-pill zoeken__filter-pill--selected">
                      {option}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="zoeken__filter-footer">
            <label className="zoeken__filter-checkbox-wrap">
              <span className="zoeken__filter-checkbox">
                <span className="zoeken__filter-checkbox-box" />
              </span>
              <span className="zoeken__filter-checkbox-label">Zoekopdracht opslaan</span>
            </label>
            <button
              className="zoeken__filter-cta"
              onClick={() => setShowFilter(false)}
            >
              {zoekenResultaten.length} Zorgverleners gevonden
            </button>
          </div>
        </div>
      )}

      {/* Top sheet overlay */}
      {showTopSheet && (
        <div className="zoeken__overlay" onClick={() => setShowTopSheet(false)}>
          <div className="zoeken__topsheet" onClick={(e) => e.stopPropagation()}>
            <div className="zoeken__topsheet-card">
              <div className="zoeken__topsheet-row" onClick={() => openBottomSheet('locatie')}>
                <LocationFilledIcon />
                <span className="zoeken__topsheet-label">1098 WC</span>
                <span className="zoeken__topsheet-meta">+ 10 km</span>
              </div>
              <div className="zoeken__topsheet-row" onClick={() => openBottomSheet('wanneer')}>
                <RepeatIcon />
                <span className="zoeken__topsheet-label">Wekelijks op di, do</span>
              </div>
              <div className="zoeken__topsheet-row" onClick={() => openBottomSheet('zorgtype')}>
                <CareHandIcon />
                <span className="zoeken__topsheet-label zoeken__topsheet-label--truncate">Persoonlijke verzorging, Huisho...</span>
                <span className="zoeken__topsheet-meta">+2</span>
              </div>
            </div>
            <div className="zoeken__topsheet-actions">
              <button
                className="zoeken__topsheet-back"
                onClick={() => setShowTopSheet(false)}
                aria-label="Sluiten"
              >
                <BackArrowIcon />
              </button>
              <button
                className="zoeken__topsheet-cta"
                onClick={() => setShowTopSheet(false)}
              >
                Zoeken
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom sheet overlay */}
      {activeBottomSheet && (
        <div className="zoeken__bs-overlay" onClick={closeBottomSheet}>
          <div className="zoeken__bs" onClick={(e) => e.stopPropagation()}>
            <div className="zoeken__bs-handle" />

            {/* ---- Locatie (Waar) ---- */}
            {activeBottomSheet === 'locatie' && (
              <>
                <div className="zoeken__bs-header">
                  <button className="zoeken__bs-back" onClick={closeBottomSheet} aria-label="Terug">
                    <BackArrowIcon />
                  </button>
                  <span className="zoeken__bs-title">Waar</span>
                </div>

                <div className="zoeken__bs-input-wrap">
                  <LocationFilledIcon />
                  <input
                    type="text"
                    className="zoeken__bs-input"
                    placeholder="Typ een postcode"
                    defaultValue="1098 WC"
                  />
                </div>

                <div className="zoeken__bs-quick-pills">
                  <button className="zoeken__bs-quick-pill">Thuis</button>
                  <button className="zoeken__bs-quick-pill">Werk</button>
                </div>

                <label className="zoeken__bs-label">Welke afstand?</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={afstand}
                  onChange={(e) => setAfstand(Number(e.target.value))}
                  className="zoeken__bs-slider"
                  style={{ '--slider-pct': `${((afstand - 1) / 99) * 100}%` }}
                />
                <div className="zoeken__bs-slider-labels">
                  <span>1 km</span>
                  <span>100 km</span>
                </div>
              </>
            )}

            {/* ---- Wanneer ---- */}
            {activeBottomSheet === 'wanneer' && (
              <>
                <div className="zoeken__bs-header">
                  <button className="zoeken__bs-back" onClick={closeBottomSheet} aria-label="Terug">
                    <BackArrowIcon />
                  </button>
                  <span className="zoeken__bs-title">Wanneer?</span>
                </div>

                <label className="zoeken__bs-label">Hoe vaak?</label>
                <div className="zoeken__bs-freq-pills">
                  <button
                    className={`zoeken__bs-freq-pill ${wanneerMode === 'terugkerend' ? 'zoeken__bs-freq-pill--active' : ''}`}
                    onClick={() => setWanneerMode('terugkerend')}
                  >
                    {wanneerMode === 'terugkerend' && <span className="zoeken__bs-check">✓</span>}
                    Terugkerend
                  </button>
                  <button
                    className={`zoeken__bs-freq-pill ${wanneerMode === 'eenmalig' ? 'zoeken__bs-freq-pill--active' : ''}`}
                    onClick={() => setWanneerMode('eenmalig')}
                  >
                    {wanneerMode === 'eenmalig' && <span className="zoeken__bs-check">✓</span>}
                    Eenmalig of tijdelijk
                  </button>
                </div>

                {wanneerMode === 'terugkerend' ? (
                  <>
                    <label className="zoeken__bs-label">Beschikbaar op:</label>
                    <div className="zoeken__bs-days">
                      {['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'].map((day) => (
                        <button
                          key={day}
                          className={`zoeken__bs-day ${selectedDays.includes(day.toLowerCase()) ? 'zoeken__bs-day--active' : ''}`}
                          onClick={() => toggleDay(day.toLowerCase())}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="zoeken__bs-beschikbaar-row">
                      <span className="zoeken__bs-label">Beschikbaar op:</span>
                      <label className="zoeken__bs-switch-wrap">
                        <span className="zoeken__bs-switch">
                          <span className="zoeken__bs-switch-thumb" />
                        </span>
                        <span className="zoeken__bs-switch-text">Meerdere dagen</span>
                      </label>
                    </div>
                    <div className="zoeken__bs-input-wrap">
                      <input
                        type="text"
                        className="zoeken__bs-input zoeken__bs-input--date"
                        placeholder="Datum"
                      />
                      <CalendarSmallIcon />
                    </div>
                  </>
                )}

                <button className="zoeken__bs-add-link" onClick={() => alert('Voeg tijden toe (nog niet geïmplementeerd)')}>
                  + Voeg tijden toe
                </button>
              </>
            )}

            {/* ---- Zorgtype ---- */}
            {activeBottomSheet === 'zorgtype' && (
              <>
                <div className="zoeken__bs-header">
                  <button className="zoeken__bs-back" onClick={closeBottomSheet} aria-label="Terug">
                    <BackArrowIcon />
                  </button>
                  <span className="zoeken__bs-title">Welke zorg zoek je?</span>
                </div>

                <div className="zoeken__bs-section-head">
                  <h3 className="zoeken__bs-section-title">Jouw zorgcategorieën</h3>
                  <p className="zoeken__bs-section-sub">Je kunt meerdere categorieën kiezen</p>
                </div>

                {Object.entries(zorgToggles).map(([key, value]) => (
                  <div key={key} className="zoeken__bs-toggle-row">
                    <button
                      className={`zoeken__bs-toggle ${value ? 'zoeken__bs-toggle--on' : ''}`}
                      onClick={() => toggleZorg(key)}
                      aria-label={`${zorgLabels[key]} ${value ? 'uitschakelen' : 'inschakelen'}`}
                    >
                      <span className="zoeken__bs-toggle-thumb" />
                    </button>
                    <span className="zoeken__bs-toggle-label">{zorgLabels[key]}</span>
                  </div>
                ))}

                <button className="zoeken__bs-expand" onClick={() => alert('Alle zorgcategorieën (nog niet geïmplementeerd)')}>
                  Bekijk alle zorgcategorieën
                  <ChevronDownIcon />
                </button>
              </>
            )}

            <button className="zoeken__bs-save" onClick={closeBottomSheet}>
              Opslaan
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Zoeken
