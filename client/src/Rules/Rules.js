import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import RuleGrid from './RuleGrid';
import RuleFilters from './RuleFilters';
import RuleInfo from './RuleInfo';
import {
  Spacer,
  InfoPanel,
  Lipsum,
  TwoPanelsResizable,
} from '../Common';
import {
  Typography,
  Divider,
} from '@material-ui/core';
import {
  onlyUnique,
  stringContains,
} from '../utils';

export default class Rules extends Component {
  constructor() {
    super();
    this.state = {
      allRules: [],
      filters: {
        name: "",
        description: "",
        tags: [],
      },
      filteredRules: [],
      uniqueTags: [],
      selectedRule: null, // selected rule to show in the info panel on the right
    };
  }

  componentDidMount() {
    // get rules from API
    fetch('/api/rule/')
      .then(res => res.json())
      .then(rules => this.setState({
        allRules: rules,
        filteredRules: rules,
        uniqueTags: rules.map(rule => rule.tags).flat().filter(onlyUnique).sort(),
      }));
  }

  updateFilters(newFilters) {
    const oldFilters = this.state.filters;
    const filters = {...oldFilters, ...newFilters}; // yknow, i'm starting to like this es7 mixing stuff

    const filteredRules = this.state.allRules.filter((rule) => (
      stringContains(rule.name, filters.name) &&
      stringContains(rule.descShort, filters.description) &&
      (filters.tags.length === 0 ? true : rule.tags.some(category => filters.tags.includes(category)))
    ))

    this.setState({
      filters,
      filteredRules,
    });
  }

  selectRule(rule) {
    this.setState({selectedRule: rule});
  }

  render() {
    return (
      <>
				<Helmet>
					<title>Rules - Fonts of Power Tooling</title>
					<meta property="og:title" content="Rules - Fonts of Power Tooling" />
				</Helmet>
        <TwoPanelsResizable>
          <div style={{flexGrow: 1}}>
              <RuleFilters onChange={(filters) => this.updateFilters(filters)} uniqueTags={this.state.uniqueTags} />
              <Spacer height={25}/>
              {/* debug
              <Typography>
                {JSON.stringify(this.state.filters)}
              </Typography>
              <Typography>
                {JSON.stringify(this.state.filteredRules)}
              </Typography>
              */}
              <RuleGrid rules={this.state.filteredRules} viewOnClick={(ev, rule) => (this.selectRule(rule))} isLoading={this.state.allRules.length === 0}/>
          </div>
          <InfoPanel variant={this.state.selectedRule} variantName="a rule">
            <RuleInfo rule={this.state.selectedRule} />
          </InfoPanel>
        </TwoPanelsResizable>
      </>
    );
  }
}
