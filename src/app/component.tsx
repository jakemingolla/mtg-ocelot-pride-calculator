import * as React from "react";
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
export class Component extends React.Component<Props, State> {
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
      // TODO this makes it so you can't delete the leading 0
      [event.target.name]: parseInt(event.target.value || "0", 10),
      // TODO
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    const catTokens = tokens.find((token) => token.name === "cat-token")!.count;
    const treasureTokens =
      tokens.find((token) => token.name === "treasure-token")?.count || 0;
    this.setState({ energy, steps, catTokens, treasureTokens });
  }

  render() {
    const { ocelots, guides, startingTreasureTokens } = this.state;
    return (
      <div>
        <label htmlFor="ocelots">Ocelots:</label>
        <input
          id="ocelots"
          type="number"
          name="ocelots"
          value={ocelots}
          onChange={this.handleChange}
        />
        <label htmlFor="guides">Guides:</label>
        <input
          id="guides"
          type="number"
          name="guides"
          value={guides}
          onChange={this.handleChange}
        />
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
        <p id="energy">Energy: {this.state.energy}</p>
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
