import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Card, Chip, IconButton, Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, shadows } from '../theme/colors';

const { width } = Dimensions.get('window');

const IssueCard = ({ issue, onPress, onVote, showReporter = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return colors.warning;
      case 'In Progress':
        return colors.badge;
      case 'Resolved':
        return colors.resolved;
      case 'Rejected':
        return colors.error;
      default:
        return colors.neutral;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return colors.error;
      case 'Medium':
        return colors.warning;
      case 'Low':
        return colors.accent;
      default:
        return colors.neutral;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const handleVote = (voteType) => {
    if (onVote) {
      onVote(issue.id, voteType);
    }
  };

  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {showReporter && (
              <View style={styles.reporterInfo}>
                <Avatar.Text
                  size={32}
                  label={issue.reportedBy?.name?.charAt(0) || 'U'}
                  style={styles.avatar}
                  labelStyle={styles.avatarLabel}
                />
                <View style={styles.reporterDetails}>
                  <Text style={styles.reporterName}>
                    {issue.reportedBy?.name || 'Anonymous'}
                  </Text>
                  <Text style={styles.reportDate}>
                    {formatDate(issue.createdAt)}
                  </Text>
                </View>
              </View>
            )}
          </View>
          
          <View style={styles.headerRight}>
            <Chip
              style={[styles.statusChip, { backgroundColor: getStatusColor(issue.status) }]}
              textStyle={styles.statusText}
            >
              {issue.status}
            </Chip>
          </View>
        </View>

        {/* Image */}
        {issue.images && issue.images.length > 0 && (
          <Image
            source={{ uri: issue.images[0].url }}
            style={styles.image}
            resizeMode="cover"
          />
        )}

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {issue.title}
          </Text>
          
          <Text style={styles.description} numberOfLines={3}>
            {issue.description}
          </Text>

          {/* Tags */}
          <View style={styles.tags}>
            <Chip
              style={[styles.categoryChip, { backgroundColor: colors.primary + '20' }]}
              textStyle={[styles.categoryText, { color: colors.primary }]}
            >
              {issue.category}
            </Chip>
            
            <Chip
              style={[styles.priorityChip, { backgroundColor: getPriorityColor(issue.priority) + '20' }]}
              textStyle={[styles.priorityText, { color: getPriorityColor(issue.priority) }]}
            >
              {issue.priority}
            </Chip>
          </View>

          {/* Location */}
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.locationText} numberOfLines={1}>
              {issue.location?.address}
            </Text>
          </View>

          {/* Resolution Info */}
          {issue.status === 'Resolved' && issue.resolvedBy && (
            <View style={styles.resolutionInfo}>
              <Ionicons name="checkmark-circle" size={16} color={colors.resolved} />
              <Text style={styles.resolutionText}>
                Resolved by {issue.resolvedBy.authorityRole || issue.resolvedBy.name}
              </Text>
            </View>
          )}
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <View style={styles.votingContainer}>
            <TouchableOpacity
              style={[
                styles.voteButton,
                issue.userVote === 'upvote' && styles.activeUpvote
              ]}
              onPress={() => handleVote('upvote')}
            >
              <Ionicons
                name={issue.userVote === 'upvote' ? 'arrow-up' : 'arrow-up-outline'}
                size={20}
                color={issue.userVote === 'upvote' ? colors.background : colors.accent}
              />
              <Text style={[
                styles.voteCount,
                issue.userVote === 'upvote' && styles.activeVoteText
              ]}>
                {issue.upvoteCount}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.voteButton,
                issue.userVote === 'downvote' && styles.activeDownvote
              ]}
              onPress={() => handleVote('downvote')}
            >
              <Ionicons
                name={issue.userVote === 'downvote' ? 'arrow-down' : 'arrow-down-outline'}
                size={20}
                color={issue.userVote === 'downvote' ? colors.background : colors.error}
              />
              <Text style={[
                styles.voteCount,
                issue.userVote === 'downvote' && styles.activeVoteText
              ]}>
                {issue.downvoteCount}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionButtons}>
            <IconButton
              icon="chat-outline"
              size={20}
              iconColor={colors.textSecondary}
              onPress={onPress}
            />
            <Text style={styles.commentCount}>{issue.commentsCount || 0}</Text>
            
            <IconButton
              icon="share-outline"
              size={20}
              iconColor={colors.textSecondary}
              onPress={() => {/* Handle share */}}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    backgroundColor: colors.background,
    ...shadows.small,
  },
  cardContent: {
    padding: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    marginLeft: spacing.sm,
  },
  reporterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: colors.primary,
  },
  avatarLabel: {
    ...typography.caption,
    color: colors.background,
  },
  reporterDetails: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  reporterName: {
    ...typography.body2,
    fontWeight: '500',
    color: colors.text,
  },
  reportDate: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  statusChip: {
    height: 24,
  },
  statusText: {
    ...typography.caption,
    color: colors.background,
    fontSize: 11,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: spacing.md,
  },
  title: {
    ...typography.h4,
    marginBottom: spacing.sm,
    color: colors.text,
  },
  description: {
    ...typography.body2,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  tags: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  categoryChip: {
    height: 28,
    marginRight: spacing.sm,
  },
  categoryText: {
    ...typography.caption,
    fontSize: 11,
  },
  priorityChip: {
    height: 28,
  },
  priorityText: {
    ...typography.caption,
    fontSize: 11,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  locationText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
    flex: 1,
  },
  resolutionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.resolved + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  resolutionText: {
    ...typography.caption,
    color: colors.resolved,
    marginLeft: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  votingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    marginRight: spacing.sm,
  },
  activeUpvote: {
    backgroundColor: colors.accent,
  },
  activeDownvote: {
    backgroundColor: colors.error,
  },
  voteCount: {
    ...typography.caption,
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  activeVoteText: {
    color: colors.background,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentCount: {
    ...typography.caption,
    color: colors.textSecondary,
    marginRight: spacing.sm,
  },
});

export default IssueCard;