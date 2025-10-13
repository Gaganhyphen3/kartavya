import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Searchbar, FAB, Chip, ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { apiService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import IssueCard from '../../components/IssueCard';
import { colors, typography, spacing, shadows } from '../../theme/colors';

const categories = [
  'All',
  'Potholes',
  'Garbage',
  'Streetlights',
  'Water Leaks',
  'Drainage',
  'Traffic Signals',
  'Other'
];

const statusFilters = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'Pending' },
  { label: 'In Progress', value: 'In Progress' },
  { label: 'Resolved', value: 'Resolved' },
];

const HomeFeedScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadIssues(true);
    }, [selectedCategory, selectedStatus])
  );

  const loadIssues = async (reset = false) => {
    try {
      if (reset) {
        setLoading(true);
        setPage(1);
      }

      const params = {
        page: reset ? 1 : page,
        limit: 10,
        ...(selectedCategory !== 'All' && { category: selectedCategory }),
        ...(selectedStatus && { status: selectedStatus }),
        ...(user.pincode && { pincode: user.pincode }),
      };

      const response = await apiService.getIssuesFeed(params);
      
      if (reset) {
        setIssues(response.issues);
      } else {
        setIssues(prev => [...prev, ...response.issues]);
      }

      setHasMore(response.pagination.page < response.pagination.pages);
      
      if (!reset) {
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Load issues error:', error);
      Alert.alert('Error', 'Failed to load issues');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadIssues(true);
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      loadIssues(false);
    }
  };

  const handleVote = async (issueId, voteType) => {
    try {
      const response = await apiService.voteOnIssue(issueId, voteType);
      
      setIssues(prev => prev.map(issue => 
        issue.id === issueId 
          ? {
              ...issue,
              upvoteCount: response.upvoteCount,
              downvoteCount: response.downvoteCount,
              netVotes: response.netVotes,
              userVote: response.userVote,
            }
          : issue
      ));
    } catch (error) {
      console.error('Vote error:', error);
      Alert.alert('Error', 'Failed to update vote');
    }
  };

  const filteredIssues = issues.filter(issue =>
    issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    issue.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderIssueCard = ({ item }) => (
    <IssueCard
      issue={item}
      onPress={() => navigation.navigate('IssueDetail', { issueId: item.id })}
      onVote={handleVote}
      showReporter={true}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Text style={styles.logo}>Kartavya</Text>
        <TouchableOpacity style={styles.locationButton}>
          <Ionicons name="location-outline" size={16} color={colors.primary} />
          <Text style={styles.locationText}>{user.pincode}</Text>
        </TouchableOpacity>
      </View>

      <Searchbar
        placeholder="Search issues..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
      />

      {/* Category Filter */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Chip
            selected={selectedCategory === item}
            onPress={() => setSelectedCategory(item)}
            style={[
              styles.categoryChip,
              selectedCategory === item && styles.selectedChip
            ]}
            textStyle={[
              styles.chipText,
              selectedCategory === item && styles.selectedChipText
            ]}
          >
            {item}
          </Chip>
        )}
        contentContainerStyle={styles.categoryList}
      />

      {/* Status Filter */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={statusFilters}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => (
          <Chip
            selected={selectedStatus === item.value}
            onPress={() => setSelectedStatus(item.value)}
            style={[
              styles.statusChip,
              selectedStatus === item.value && styles.selectedChip
            ]}
            textStyle={[
              styles.chipText,
              selectedStatus === item.value && styles.selectedChipText
            ]}
          >
            {item.label}
          </Chip>
        )}
        contentContainerStyle={styles.statusList}
      />
    </View>
  );

  const renderFooter = () => {
    if (!loading || page === 1) return null;
    
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="document-outline" size={64} color={colors.neutral} />
      <Text style={styles.emptyTitle}>No Issues Found</Text>
      <Text style={styles.emptyText}>
        {searchQuery 
          ? 'Try adjusting your search or filters'
          : 'Be the first to report an issue in your area!'
        }
      </Text>
    </View>
  );

  if (loading && page === 1) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading issues...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredIssues}
        renderItem={renderIssueCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      <FAB
        icon="camera"
        style={styles.fab}
        onPress={() => navigation.navigate('Report')}
        color={colors.background}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.md,
    backgroundColor: colors.background,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logo: {
    ...typography.h2,
    color: colors.primary,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  locationText: {
    ...typography.caption,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
  searchBar: {
    marginBottom: spacing.md,
    backgroundColor: colors.surface,
    elevation: 0,
  },
  searchInput: {
    ...typography.body2,
  },
  categoryList: {
    paddingVertical: spacing.sm,
  },
  statusList: {
    paddingVertical: spacing.sm,
  },
  categoryChip: {
    marginRight: spacing.sm,
    backgroundColor: colors.surface,
  },
  statusChip: {
    marginRight: spacing.sm,
    backgroundColor: colors.surface,
  },
  selectedChip: {
    backgroundColor: colors.primary,
  },
  chipText: {
    ...typography.caption,
    color: colors.text,
  },
  selectedChipText: {
    color: colors.background,
  },
  listContent: {
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    ...typography.body2,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  loadingFooter: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.body2,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    margin: spacing.lg,
    right: 0,
    bottom: 80,
    backgroundColor: colors.accent,
    ...shadows.medium,
  },
});

export default HomeFeedScreen;