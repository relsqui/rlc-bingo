import * as React from "react";
import { useState } from "react";
import { styled } from "styled-components";
import { items } from "./items.json";

function BaseChip({ left, top, className }) {
  const classes = ["chip", className].join(" ");
  return <span className={classes} />;
}


const OffsetChip = styled(BaseChip)`
  left: ${(props) => props.left}em;
  top: ${(props) => props.top}em;
`;

function makeOffset() {
  return Math.random() * 1.8 - 0.9;
}

function Chip() {
  const [left, setLeft] = useState(makeOffset());
  const [top, setTop] = useState(makeOffset());
  return (
    <span className="chipHolder">
      <OffsetChip left={left} top={top} />
    </span>
  );
}

function Item({ content, hasChip, clickHandler }) {
  const chip = hasChip ? <Chip /> : "";
  return (
    <>
      <button className="item" onClick={clickHandler}>
        {content}
        {chip}
      </button>
    </>
  );
}

function shuffle(array) {
  // This is from: https://stackoverflow.com/a/2450976/252125
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function chooseItems() {
  const shuffled = shuffle(items);
  return shuffled.slice(0, 16).map((item) => {
    return { item, hasChip: false };
  });
}

export default function Card() {
  const [cardItems, setCardItems] = useState(() => chooseItems());

  function toggle(index) {
    const newItems = [...cardItems];
    newItems[index].hasChip = !cardItems[index].hasChip;
    setCardItems(newItems);
  }

  return (
    <>
      <div className="card">
        {cardItems.map((item, index) => (
          <Item
            key={index}
            content={item.item}
            hasChip={item.hasChip}
            clickHandler={() => toggle(index)}
          />
        ))}
      </div>
    </>
  );
}
