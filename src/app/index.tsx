import * as ReactDOM from "react-dom/client";
import * as React from "react";
import { Component } from "./component";

import { calculate } from "../core";
import { TokenType } from "../types/tokens";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props {}
interface State {
  ocelots: number;
  guides: number;
  startingTreasureTokens: number;
  treasureTokens: number;
  catTokens: number;
  energy: number;
  steps: string[];
}
class Foo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.calculate = this.calculate.bind(this);
    this.state = {
      ocelots: 1,
      guides: 1,
      startingTreasureTokens: 0,
      treasureTokens: 0,
      catTokens: 0,
      energy: 0,
      steps: [],
    };
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      [event.target.name]: parseInt(event.target.value, 10),
    } as any);
  }

  calculate() {
    const { ocelots, guides, startingTreasureTokens } = this.state;
    const startingTokens = [
      {
        name: "treasure-token",
        count: startingTreasureTokens,
        type: TokenType.NON_CREATURE,
      },
    ];
    const { energy, steps, tokens } = calculate(
      ocelots,
      guides,
      ocelots + guides + startingTreasureTokens,
      startingTokens,
    );
    console.log("here", tokens);
    const catTokens = tokens.find((token) => token.name === "cat-token")!.count;
    const treasureTokens =
      tokens.find((token) => token.name === "treasure-token")?.count || 0;
    this.setState({ energy, steps, catTokens, treasureTokens });
  }

  render() {
    const { ocelots, guides, startingTreasureTokens } = this.state;
    return (
      <div>
        <label>
          Ocelots:
          <input
            type="number"
            name="ocelots"
            value={ocelots}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Guides:
          <input
            type="number"
            name="guides"
            value={guides}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Starting Treasure Tokens:
          <input
            type="number"
            name="startingTreasureTokens"
            value={startingTreasureTokens}
            onChange={this.handleChange}
          />
        </label>
        <button type="button" onClick={this.calculate}>
          Calculate
        </button>
        <p>Energy: {this.state.energy}</p>
        <p>Cat Tokens: {this.state.catTokens}</p>
        <p>Treasure Tokens: {this.state.treasureTokens}</p>
        <ul>
          {this.state.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Foo />
  </React.StrictMode>,
);
