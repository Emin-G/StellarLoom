<img src="https://cdn.discordapp.com/attachments/807077862880444456/1135196540319842324/StellarLoom_Pamplet-min.png" alt="StellarLoomThumb" width="100%">

#  StellarLoom Preview
<p align="center">
<img src="https://cdn.discordapp.com/attachments/807077862880444456/1135196540663762954/StellarLoom_Profile_Round-min.png" alt="StellarLoom" width="40%">
</p>

<p align="center">
StellarLoom은 이미 다른 이들에게 스며져 있지만, 여전히 당신의 마음 속에도 깃들 수 있는 안정적이고 효율적인 뮤직봇 입니다.
</p>
<p align="center">
‘Stellar’의 ‘혜성’이라는 의미와, ‘Loom’의 ‘어렴풋이 보이다'라는 뜻이 결합된 StellarLoom은,
기존 Daydream 뮤직봇 프로젝트의 한계를 능가하는 가능성을
어렴풋이 보이는 혜성에 비유해 추상적으로 나타냅니다.
</p>

---

<div align="center">
<img src="https://cdn.discordapp.com/attachments/807077862880444456/1135223090041847908/stellar4.png" width="60%">
</div>

<p align="center">
StellarLoom은 심플하고 직관적인 디자인과
</p>
<p align="center">
Daydream 프로젝트에 비해 더욱 안정적이고 많은 수의 스트리밍을 감당할 수 있으며
</p>
<p align="center">
누구나 빠르게 명령어를 사용할 수 있는 간단함을 목표로 개발되고 있습니다.
</p>

 - 영상 출처 - 공룡 @rulrudino
 - https://youtu.be/Mh02Uv39mQI
 - https://youtu.be/42e7hyTiKUE
 - **☆☆☆24시간 스트리밍 및 롤모델 삼기 환영 중(아마)☆☆☆**

---

<div align="center">
<a href="https://github.com/Emin-G/Daydream-music-bot">
<img src="https://cdn.discordapp.com/attachments/807077862880444456/1135203605218078760/Daydream_Pamplet.png" alt="Daydream" width="45%">
</a>
<a href="https://yupi.arite.studio/">
<img src="https://cdn.discordapp.com/attachments/807077862880444456/1135205794619605122/Yupi_Pamplet.png" alt="Yupi" width="45%">
</div>
</a>
<p align="center">
뮤직봇을 처음 다루어 보거나 가볍게 사용려면 Daydream 프로젝트를 참고해주세요.
</p>
<p align="center">
Daydream, StellarLoom 프로젝트를 체험해보고 싶다면 유피를 서버에 초대해보세요!
</p>

---

##  🎉 2.0 업데이트
- 대량 스킵 기능이 추가됬어요. ( /스킵 1 10 -> 1번 ~ 10번 트랙 스킵 )
- 이동 기능이 추가됬어요. ( /이동 1 30 -> 1분 30초 위치로 이동 )
- 스킵 사용 이후 트랙 자동 스킵이 안되던 문제를 해결했어요.

---

##  **목차**

###  **설치**
-  [서버 설정](#서버설정)
-  [실행](#실행)

###  **기능**
-  [재생](#재생)
-  [중지](#중지)
-  [스킵](#스킵)
-  [재생목록](#재생목록)
-  [반복](#반복)
-  [셔플](#셔플)
-  [이동](#이동)

#  설치

##  서버설정
**Windows 운영체제를 기준으로 설명합니다.**

.env 파일을 StellarLoom 폴더 내에 생성해주세요.

>  BOT_TOKEN=

>  CLIENT_ID=

>  LAVA_PORT=27017

>  LAVA_PASS=stellarloomtemppass

다음 내용을 복사해서 붙여넣어주세요.

**BOT_TOKEN**에 생성한 봇의 토큰을,
**CLIENT_ID**에 봇의 Client ID를 넣어주세요.

봇의 MESSAGE CONTENT INTENT가 켜져있어야 하고 서버 내 메세지 삭제 권한이 필요합니다.

**LAVA_PORT**는 LavaLink 뮤직 서버의 포트를 의미합니다.
**LAVA_PASS**는 LavaLink 뮤직 서버의 비밀번호를 의미합니다.
초기 비밀번호는 **stellarloomtemppass** 으로 되어있습니다.

**LAVA_PORT**와 **LAVA_PASS**는 잘 모르겠다면 건드리지 않는 것이 좋습니다.

많은 사용자를 보유하고 있는 **거대한 봇에 사용**할 경우에는 **LAVA_PASS**를 변경하는 것을 권장합니다.

바꿀때는 .env 파일안의 **LAVA_PASS**와 application.yml 안의 **password**를 동시에 바꿔주어야 정상적으로 작동합니다.

---

위의 사항에서 어려움을 겪었다면 Daydream 프로젝트를 사용하거나, Daydream 프로젝트의 설명을 참고해주세요.

---

StellarLoom은 LavaLink 서버가 구동되고 있어야 정상적으로 작동합니다.

먼저, LavaLink 서버를 구동하기 위해서는 JDK 17 버전의 설치가 필요합니다.
* 이미 JDK 17 버전이 설치되어 있다면 이 단계를 건너 뛰셔도 좋습니다.

https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html
위 사이트를 열어주세요.

> <img src="https://cdn.discordapp.com/attachments/807077862880444456/1135431093361844265/stellar6-min.png" width="100%">
> 17.x.x 중 가장 최신 버전의 JDK 설치 프로그램을 다운로드 해주세요.

JDK 설치를 완료해주세요.

---

https://github.com/lavalink-devs/Lavalink/releases
위 사이트를 열어주세요.

><img src="https://cdn.discordapp.com/attachments/807077862880444456/1138680668696617040/stellar_fix-min.png" width="100%">
>Lavalink.jar를 다운로드 받아주세요. 3.x.x 버전을 권장하고 있습니다.
>3.x.x 중 최대한 최신 버전을 다운로드 받아주세요.

---

><div align="center"><img src="https://cdn.discordapp.com/attachments/807077862880444456/1135213138220945499/stellar2-min.png" width="50%"></div>
>Server 폴더를 StellarLoom 폴더 밖으로 꺼내주세요.

---

><div align="center"><img src="https://cdn.discordapp.com/attachments/807077862880444456/1135214717128945815/stellar3-min.png" width="30%"></div>
>밖으로 꺼낸 Server 폴더 안에 아까 다운받았던 Lavalink.jar를 넣어주세요.

---

폴더 안의 start.bat을 키면 뮤직 서버가 실행됩니다.
서버가 실행된 후 봇을 키시면 됩니다.

---

#  기능

현재 Daydream 프로젝트에 비해 지원하는 명령어가 적습니다.
점차 추가 해 나갈 예정이니 조큼만 기다려주세요.

##  재생
>  /재생 [옵션]

-  **옵션**
- 검색어
- 영상 URL
- 재생목록 URL

URL은 **Youtube**, *SoundCloud, BandCamp, Twitch* 를 지원하고 있습니다.

* 볼드체는 정식 지원 나머지는 일단 되긴 한다 입니다.

##  중지
>  /중지

##  스킵
>  /스킵

>  /스킵 [트랙 번호]

>  /스킵 [시작 트랙 번호, 끝 트랙 번호]

여러 트랙을 삭제할 수도 있습니다. 1 3은 1 ~ 3번 트랙을 스킵합니다.

- 트랙 번호는 [/재생목록](#재생목록) 을 참조

##  재생목록
>  /재생목록

**`트랙 번호`** | 곡 이름

##  반복
>  /반복

## 셔플
>  /셔플

## 이동
>  /이동 [시간]

예를 들어 1 30 은 1분 30초 부터 재생합니다.