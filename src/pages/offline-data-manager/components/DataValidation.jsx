import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataValidation = ({ 
  validationData, 
  onRunValidation, 
  onFixIssue, 
  onViewDetails 
}) => {
  const getValidationStatusColor = (status) => {
    switch (status) {
      case 'passed': return 'text-success';
      case 'warning': return 'text-warning';
      case 'failed': return 'text-error';
      case 'running': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getValidationIcon = (status) => {
    switch (status) {
      case 'passed': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'failed': return 'XCircle';
      case 'running': return 'Loader';
      default: return 'Circle';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-primary';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Validation Overview */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
              <Icon name="Shield" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Data Validation</h3>
              <p className="text-sm text-muted-foreground">GeoJSON integrity and quality checks</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={onRunValidation}
            iconName="Play"
            iconPosition="left"
            disabled={validationData?.isRunning}
          >
            {validationData?.isRunning ? 'Running...' : 'Run Validation'}
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {validationData?.summary?.passed}
            </div>
            <div className="text-sm text-success">Passed</div>
          </div>
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-warning mb-1">
              {validationData?.summary?.warnings}
            </div>
            <div className="text-sm text-warning">Warnings</div>
          </div>
          <div className="bg-error/10 border border-error/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-error mb-1">
              {validationData?.summary?.failed}
            </div>
            <div className="text-sm text-error">Failed</div>
          </div>
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {validationData?.summary?.total}
            </div>
            <div className="text-sm text-muted-foreground">Total Checks</div>
          </div>
        </div>
      </div>
      {/* Validation Results */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="FileText" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Validation Results</h3>
        </div>

        <div className="space-y-4">
          {validationData?.checks?.map((check, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getValidationIcon(check?.status)} 
                    size={20} 
                    className={`${getValidationStatusColor(check?.status)} ${
                      check?.status === 'running' ? 'animate-spin' : ''
                    }`} 
                  />
                  <div>
                    <h4 className="font-medium text-foreground">{check?.name}</h4>
                    <p className="text-sm text-muted-foreground">{check?.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${getValidationStatusColor(check?.status)}`}>
                    {check?.status?.charAt(0)?.toUpperCase() + check?.status?.slice(1)}
                  </span>
                  {check?.status !== 'running' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(check?.id)}
                      iconName="Eye"
                    >
                      Details
                    </Button>
                  )}
                </div>
              </div>

              {check?.issues && check?.issues?.length > 0 && (
                <div className="space-y-2">
                  {check?.issues?.slice(0, 3)?.map((issue, issueIndex) => (
                    <div key={issueIndex} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <Icon 
                        name="AlertCircle" 
                        size={16} 
                        className={getSeverityColor(issue?.severity)} 
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-foreground">{issue?.message}</div>
                        <div className="text-xs text-muted-foreground">
                          {issue?.location} • Severity: {issue?.severity}
                        </div>
                      </div>
                      {issue?.fixable && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onFixIssue(issue?.id)}
                          iconName="Wrench"
                        >
                          Fix
                        </Button>
                      )}
                    </div>
                  ))}
                  {check?.issues?.length > 3 && (
                    <div className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(check?.id)}
                      >
                        View {check?.issues?.length - 3} more issues
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {check?.status === 'passed' && (
                <div className="flex items-center space-x-2 text-success">
                  <Icon name="CheckCircle" size={16} />
                  <span className="text-sm">All checks passed successfully</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Data Quality Metrics */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="BarChart3" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">Data Quality Metrics</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-foreground mb-3">Coordinate System</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm text-muted-foreground">Projection</span>
                <span className="text-sm font-medium text-foreground">
                  {validationData?.metrics?.coordinateSystem?.projection}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm text-muted-foreground">Valid Coordinates</span>
                <span className={`text-sm font-medium ${
                  validationData?.metrics?.coordinateSystem?.validPercentage > 95 ? 'text-success' : 'text-warning'
                }`}>
                  {validationData?.metrics?.coordinateSystem?.validPercentage}%
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm text-muted-foreground">Bounds Check</span>
                <span className={`text-sm font-medium ${
                  validationData?.metrics?.coordinateSystem?.withinBounds ? 'text-success' : 'text-error'
                }`}>
                  {validationData?.metrics?.coordinateSystem?.withinBounds ? 'Passed' : 'Failed'}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-3">Data Completeness</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm text-muted-foreground">Required Fields</span>
                <span className={`text-sm font-medium ${
                  validationData?.metrics?.completeness?.requiredFields > 95 ? 'text-success' : 'text-warning'
                }`}>
                  {validationData?.metrics?.completeness?.requiredFields}%
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm text-muted-foreground">Missing Values</span>
                <span className="text-sm font-medium text-foreground">
                  {validationData?.metrics?.completeness?.missingValues?.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm text-muted-foreground">Duplicate Records</span>
                <span className={`text-sm font-medium ${
                  validationData?.metrics?.completeness?.duplicates === 0 ? 'text-success' : 'text-warning'
                }`}>
                  {validationData?.metrics?.completeness?.duplicates?.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Last Validation */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Last validation: {validationData?.lastRun}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            Duration: {validationData?.lastDuration}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataValidation;