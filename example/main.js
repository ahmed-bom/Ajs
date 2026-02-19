const table_data = [
  ["name", "email"],
  ["jdoe88", "jane.doe@example.com"],
  ["ali67", "ali.doe@example.com"],
];

const table_json_data = [
  {
    id: 1,
    name: "Alex",
    email: "alex.smith@provider.net",
    profile: {
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      bio: "Tech enthusiast and coffee lover.",
    },
    tags: ["staff", "developer"],
  },
  {
    id: 2,
    name: "Maria",
    email: "m.garcia@webmail.com",
    profile: {
      avatar_url: null,
      bio: "Exploring the world of data.",
    },
    tags: ["beta-tester"],
  },
];

const pargraf = ` 
          Did you know :
          that in a 17th-century painting,
          the emperor Shah Jahan is depicted in profile,
          as painting him head-on was viewed as disrespectful?
`;

// ==================================

const coint = () => {
  let c = 0;
  return button("clik !")
    ._style({ width: "70px" })
    ._onclick((b) => {
      b._textcontent(`clik ${++c}`);
    });
};

const card = (text, w = "200px") => {
  const para = p(text)._style({ width: w });
  return div("_card")
    ._append(
      copy(() => para.textContent),
      para,
    )
    ._style({ borderStyle: "solid" });
};

const form = () => {};

init()._append(
  flex()._append(
    div()._append(
      flex()._append(spinner(), spinner(50), spinner(60)),
      div()._append(textinp(), input()),
      div()._append(button("normal"), coint()),
    ),
    card(pargraf),
  ),
  hr("60%", "5px"),
  flex()._append(table(table_data), jtable(table_json_data)),
);
