module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-standard',
    'stylelint-config-standard-scss'
  ],
  rules: {
    'custom-property-empty-line-before': null,
    'rule-empty-line-before': null,
    'selector-class-pattern': null,
    'max-line-length': null,
    'scss/no-global-function-names': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'no-empty-source': null,
    'named-grid-areas-no-invalid': null,
    'unicode-bom': 'never',
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }]
  }
};
