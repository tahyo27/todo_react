import React, {useState, useEffect, useMemo} from "react";

function Quotes() {
    const quotes = useMemo(() =>[
        {
            quote: "시작이 반이다.",
            author: "아리스토텔레스"
        },
        {
            quote: "일은 해보면 쉬운 법이다. 그럼에도 시작은 하지 않고 어렵다고만 생각하기에 할 수 있는 일들을 놓친다.",
            author: "아리스토텔레스"
        },
        {
            quote: "거리낌 없이 한 시간을 낭비하는 사람은 아직 삶의 가치를 발견하지 못한 사람이다.",
            author: "찰스 다윈"
        },
        {
            quote: "사람은 망설이지만 시간은 망설이지 않는다. 잃어버린 시간은 되돌아오지 않는다.",
            author: "벤자민 프랭클린"
        },
        {
            quote: "반성하지 않는 삶은 살 가치가 없다",
            author: "소크라테스"
        },
        {
            quote: "무지를 아는 것이 곧 앎의 시작이다.",
            author: "소크라테스"
        },
        {
            quote: "인간사에는 안정된 것이 하나도 없음을 기억하라. 그러므로 성공에 들뜨거나 역경에 지나치게 의기소침하지 마라.",
            author: "소크라테스"
        },
        {
            quote: "인생은 자전거를 타는 것과 같다. 균형을 잡으려면 움직여야 한다.",
            author: "아인슈타인"
        },
        {
            quote: "춤추는 별을 잉태하려면 반드시 스스로의 내면에 혼돈을 지녀야 한다.",
            author: "프리드리히 니체"
        },
        {
            quote: "배우나 생각하지 않으면 공허하고, 생각하나 배우지 않으면 위험하다.",
            author: "공자"
        },
        {
            quote: "감사하는 마음은 최고의 미덕일 뿐 아니라 모든 미덕의 아버지다.",
            author: "키케로"
        },
        {
            quote: "삶이 있는 한 희망은 있다.",
            author: "키케로"
        }
    ], []);

    const [todaysQuote, setTodaysQuote] = useState({quote:"", author:""});

    useEffect(() => {
        const randomIndex = Math.floor((Math.random() * quotes.length));
        //console.log("randomIndex" + randomIndex);
        setTodaysQuote(quotes[randomIndex]);

    }, [quotes]);

    return (
        <div>{todaysQuote.quote} - {todaysQuote.author}</div>
    );
    
}

export default Quotes;